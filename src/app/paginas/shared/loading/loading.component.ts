import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() messagge: string = "";
  popupVisible:boolean = true;
  mensajeLoading : string = "";
  constructor() { }

  ngOnInit() {
    this.mensajeLoading = this.messagge;
  }


}
