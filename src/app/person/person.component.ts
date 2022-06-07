import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {PersonService} from "./shared/person.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  breadCrumbItems: MenuItem[] = [];
  isLoading = false;
  total: number = 0;
  list: any[] = [];
  formQuery: FormControl = new FormControl('')

  cols: any[] = [
    {field: 'name', header: 'Name', sortable: true},
    {field: 'height', header: 'Height', sortable: true},
    {field: 'mass', header: 'Mass', sortable: false},
    {field: 'hair_color', header: 'Hair Color', sortable: false},
    {field: 'skin_color', header: 'Skin Color', sortable: false},
    {field: 'birth_year', header: 'Birth Year', sortable: false},
    {field: 'gender', header: 'Gender', sortable: false},
    {field: 'created', header: 'Created', sortable: false, type: 'date'},
    {field: 'edited', header: 'Edited', sortable: false, type: 'date'},
    {field: 'url', header: 'Url', sortable: false},
    // the below fields can be added if need be and with the help of toggle. so as not to have tide columns.
    // {field: 'films', header: 'films', sortable: false, type: 'array'},
    // {field: 'species', header: 'species', sortable: false,type: 'array'},
    // {field: 'vehicles', header: 'vehicles', sortable: false,type: 'array'},
    // {field: 'starships', header: 'starships', sortable: false,type: 'array'},
  ];

  constructor(private personService: PersonService) {

  }

  ngOnInit(): void {
    this.initBreadcrumbs();
    this.initPerson();
    this.valueChanges();
  }

  initBreadcrumbs(): void {
    this.breadCrumbItems = [
      {label: 'Home'},
      {label: 'Manage Persons'},
    ];

  }

  initPerson(): void {
    this.isLoading = true;
    this.personService.getPersons().subscribe((persons) => {
      this.list = persons;
      this.total = persons.length;
      this.isLoading = false;
    });
  }

  searchPerson(search: string): void {
    this.isLoading = true;

    this.personService.searchPersons(search).subscribe((persons: any) => {
      this.list = persons;
      this.total = persons.length;
      this.isLoading = false;
    });
  }

  valueChanges(): void {
    this.formQuery.valueChanges.subscribe(value => {
      if (value && value != '') {
        this.searchPerson(value);
      }else {
        this.initPerson();
      }
    });
  }


}
