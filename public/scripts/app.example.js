class App {
  constructor() {
    this.inputDate = document.getElementById("date");
    this.inputTime = document.getElementById("time");
    this.inputjPenumpang = document.getElementById("jPenumpang");
  
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    this.clear();
    const data = this.filterCari();
    console.log("Jumlah Mobil :", data);

    if (data.length == 0 || data == undefined) {
        const node = document.createElement("div");
        // node.innerHTML = "<h1> No Car Available </h1>";
        this.carContainerElement.appendChild(node);
    } else {
      data.forEach((Car) => {
        const node = document.createElement("div");
        node.innerHTML = Car.render();
        this.carContainerElement.appendChild(node);
      });
    }
  };

  filterCari() {
    const dateValue = this.inputDate.value;
    const timeValue = this.inputTime.value;
    const capacityValue = this.inputjPenumpang.value;

    const newDateTime = new Date(`${dateValue}T${timeValue}Z`);
    const datenow = new Date();
    
    if (newDateTime.getDate() < datenow.getDate()) {
      alert("invalid date please input greater than now!");
      return;
    } else if (capacityValue < 0) {
      alert("Invalid passanger amount !");
      return;
    } else {
      return Car.list.filter(
        (car) => car.capacity >= capacityValue && car.availableAt >= newDateTime
      );
    }
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
