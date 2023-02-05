import { Component, OnInit } from '@angular/core';
import { Test } from '../models/test.model';
import { TesttService } from '../services/testt.service';
import { UserService } from '../services/user.service';


interface DataItem {
  name: string;
  age: number;
  address: string;
}


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  searchValue = '';
  visible = false;
  donner :Test[] = [];
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData : any;


  constructor(private testservice:TesttService) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.donner.filter((item: Test) => item.id.toString().indexOf(this.searchValue) !== -1);
  }

  getAlloffre():void{
    this.testservice.getAll()
    .subscribe(
      data => {
        this.donner=data.reverse();
        console.log(data);
        this.listOfDisplayData = [...this.donner];
      },
      error => {
        console.log(error);
      });
    }

    deleteRow(id:any){
      console.log(id)
      for(let i = 0; i < this.listOfDisplayData.length; ++i){
          if (this.listOfDisplayData[i].id === id) {
              this.listOfDisplayData.splice(i,1);
          }
      }
  }


  ngOnInit(): void {
this.getAlloffre()
  }

}
