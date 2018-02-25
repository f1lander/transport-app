import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Vehicles from './vehicles.model';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  // It maintains list of transports
  vehicles: Vehicles[] = [];
  // It maintains transport Model
  vehicleModel: Vehicles;
  // It maintains transport form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;
  transportsTypes: string[] = ['Bus', 'Truck'];
  // It maintains Array of countries.
  constructor() {
    // Add default transport data.
    const dbVehicles = localStorage.getItem('vehiclesList');

    if (dbVehicles) {
      this.vehicles = JSON.parse(dbVehicles);
    } else {
      this.vehicles.push(new Vehicles('Bus', 'Yellow', '2.5 CC', 2000, 5000));

      this.setLocalStorage();
    }
  }

  ngOnInit() { }

  // This method associate to New Button.
  onNew() {
    // Initiate new transport.
    this.vehicleModel = new Vehicles();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display transport entry section.
    this.showNew = true;
  }

  onChangeTransportType(type: string) {
    // Assign corresponding selected country to model.
    this.vehicleModel.type = type;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push transport model object into transport list.
      this.vehicles.push(this.vehicleModel);
    } else {
      // Update the existing properties values based on model.
      this.vehicles[this.selectedRow].type = this.vehicleModel.type;
      this.vehicles[this.selectedRow].color = this.vehicleModel.color;
      this.vehicles[this.selectedRow].engine = this.vehicleModel.engine;
      this.vehicles[this.selectedRow].weight = this.vehicleModel.weight;
      this.vehicles[this.selectedRow].price = this.vehicleModel.price;
    }

    this.setLocalStorage();
    // Hide transport entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new transport.
    this.vehicleModel = new Vehicles();
    // Retrieve selected transport from list and assign to model.
    this.vehicleModel = Object.assign({}, this.vehicles[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display transport entry section.
    this.showNew = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding transport entry from the list.
    this.vehicles.splice(index, 1);

    this.setLocalStorage();
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide transport entry section.
    this.showNew = false;
  }

  setLocalStorage() {
    if (this.vehicles) {
      localStorage.setItem('vehiclesList', JSON.stringify(this.vehicles));
    }
  }
}
