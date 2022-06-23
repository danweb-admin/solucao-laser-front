import { Client } from './../../../../shared/models/client';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClientsService } from './../../../../shared/services/clients.service';
import { EquipamentsService } from './../../../../shared/services/equipaments.service';
import { ToastrService } from 'ngx-toastr';
import { SpecificationsService } from 'src/app/shared/services/specifications.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { MY_FORMATS } from 'src/app/consts/my-format';
import { MatTableDataSource } from '@angular/material/table';
import { Calendar } from 'src/app/shared/models/calendar';
import { SelectionModel } from '@angular/cdk/collections';
import { Specification } from 'src/app/shared/models/specification';
import { Equipament } from 'src/app/shared/models/equipament';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
    selector: 'app-availability-table',
    templateUrl: 'availability-table.component.html',
    styleUrls: ['./availability-table.component.scss',],
    providers: [
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
  })
  export class AvailabilityTableComponent implements OnInit{
    
    displayedColumns: string[] = ['data','horario','equipamento','locatario','tecnica','motorista','status'];
    @ViewChild('inputSearch') inputSearch: ElementRef;
    dataSource: MatTableDataSource<Calendar> = new MatTableDataSource<Calendar>();
    selection = new SelectionModel<Calendar>(true, []);
    selectedTabIndex = 0;
    specificationArray: Specification[];
    equipamentResult: Equipament[];
    clientResult: [];
    inputReadonly = false;
    isLoading = false;
    notFound = false;
    form: FormGroup;
    
    constructor(private calendarService: CalendarService,
                public dialog: MatDialog,
                private specificationSerivce: SpecificationsService,
                private toastrService: ToastrService,
                private formBuilder: FormBuilder,
                private equipamentService: EquipamentsService,
                private clientService: ClientsService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
      this.loadSpecifications();
      this.getEquipaments();
      

      this.form = this.formBuilder.group({
        startDate: [null],
        endDate: [null],
        client: [null],
        equipamentId: [null],
      });
      this.onChanges();

    }

    onChanges(){
      this.form.get('client').valueChanges.pipe(
          filter( data => {
            if (typeof data === 'string' || data instanceof String){
              if (data.trim().length <= 2){
                this.isLoading = true;
                this.notFound = false;
                this.clientResult = [];
              }
              return data.trim().length > 2
            }
          }),
          debounceTime(500),
          switchMap(  (search: string) => {
            return search ? this.clientService.getClients(true,search) : of([]);
       })
      ).subscribe(data =>{
        this.clientResult = data as [];
        if (this.clientResult.length == 0)
          this.notFound = true
        else
          this.isLoading = false;
      })
    }

    async loadSpecifications(): Promise<void> {
      await this.specificationSerivce.loadSpecifications().toPromise().then((data) => {
        localStorage.setItem('specificationsList',JSON.stringify(data));
        this.specificationArray = data;
      }); 
    }

    displayFn(item) {
      if (item === null)
        return;
      return item?.name;
    }

    descriptionSpecifications(item: Calendar){
      let retorno = new Array();
      item.calendarSpecifications.forEach(obj => {
        if (obj.active === true){
          let name = this.specificationArray?.find(x => x.id === obj.specificationId);
          if (name){
            retorno.push(name.name);
          }
        }   
      });
      return retorno.join(' - ')
    }

    showTime(item: Calendar){
      let start = ''
      let end = '';
      if (item.startTime)
        start = item.startTime.substring(11,16);
      if (item.endTime)
        end = item.endTime.substring(11,16)
      return start + ' - ' + end;
    }

    statusToString(status){
      let ret = 'Confirmada';

      if (status == 'pending'){
        ret = 'Pendente';
      }else if (status == 'canceled'){
        ret = 'Cancelada';
      }

      

      return ret;
    }

    onSubmit(): void{
      debugger
      let startDate = this.form.value.startDate.format('yyyy-MM-DD');
      let endDate = this.form.value.endDate.format('yyyy-MM-DD');
      let clientId = '';
      let equipamentId = this.form.value.equipamentId === null ? '' : this.form.value.equipamentId;
      if (this.form.value.client !== null && this.form.value.client !== ''){
        clientId = this.form.value.client.id;
      }

      this.calendarService.availability(startDate, endDate, clientId, equipamentId)
        .subscribe((resp: Calendar[]) => {
          this.dataSource = new MatTableDataSource<Calendar>();
          this.dataSource = new MatTableDataSource<Calendar>(resp);
        })
    }

    getEquipaments(): void{
      this.equipamentService.loadEquipaments(true).subscribe((resp: Equipament[]) => {
        this.equipamentResult = resp;
      })
    }
    
  }