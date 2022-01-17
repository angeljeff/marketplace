import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArrayMenu} from './menu';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  


   menus: ArrayMenu[] = [{
    id: '1',
    name: 'Plaguicidas',
    items: [{
      id: '1_1',
      name: 'Item1',
    }, {
      id: '1_2',
      name: 'Item2',
     
    }],
  }, {
    id: '2',
    name: 'Fertilizantes',
    items: [{
      id: '2_1',
      name: 'Item3',
     
    }, {
      id: '2_2',
      name: 'Item4',
     
    }],
  }];

  data2: string [] = [ 

      'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Charles', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald', 'George', 'Kenneth', 'Steven', 'Edward', 'Brian', 'Ronald', 'Anthony', 'Kevin', 'Jason', 'Jeff', 'Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Jennifer', 'Maria', 'Susan', 'Margaret', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah',
    ];

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.mandarMensaje();
  }

  mandarMensaje(){

  }


  itemClick(data:any) {
    const item = data.itemData;

    console.log(item);
    switch (item.name) {
      case "Item1":
        this.router.navigate(["/pagina"]);
        break;
      case "Item2":
      this.router.navigate(["/pagina3"]);
      break;
    }
      

    if (item.price) {
      //this.currentProduct = item;
    }
  }
 
}
