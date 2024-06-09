import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Calendar } from 'src/app/shared/models/calendar';
import { Specification } from 'src/app/shared/models/specification';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { SpecificationsService } from 'src/app/shared/services/specifications.service';

@Injectable()
@Component({
    selector: 'app-consumable-forms',
    templateUrl: './consumable-forms.component.html',
    styleUrls: ['./consumable-forms.component.scss'],
    
    viewProviders: [MatExpansionPanel]
    
})
export class ConsumableFormsComponent implements OnInit{
    
    @Input() calendar: any;
    specificationArray: Specification[];
    form: FormGroup;
    consumableArray: [] = [];
    consumableSpecificationArray: [] = [];
    todayDate;
    
    
    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private calendarService: CalendarService,
        private specificationSerivce: SpecificationsService) {
        }
        
        ngOnInit(): void {
            this.loadSpecifications();
            this.createForm();
            this.loadConsumableSpecification();
            this.loadConsumables();
        }
        
        createForm(): void {
            this.form = this.formBuilder.group({
                id:  [this.calendar.id ],
                createdAt: [this.calendar.createdAt ],
                updatedAt: [this.calendar.updatedsAt || null],
                clientId:  [this.calendar.clientId],
                driverId:  [this.calendar.driverId],
                techniqueId:  [this.calendar.techniqueId] ,
                active: [true],
                noCadastre:  [this.calendar.noCadastre] ,
                note:  [this.calendar.note] ,
                userId: [this.calendar.userId],
                parentId: [this.calendar.parentId],
                discount:  [this.calendar.discount.toFixed(2).replace('.',',')],
                freight:  [this.calendar.freight.toFixed(2).replace('.',',')] ,
                totalValue: [this.calendar.totalValue.toFixed(2).replace('.',',')],
                value: [this.calendar.value.toFixed(2).replace('.',',')],
                travelOn:  [this.calendar.travelOn] ,
                date:  [this.calendar.date],
                startTime1: [this.calendar.startTime.substring(11,16)],
                endTime1:  [this.calendar.endTime.substring(11,16)],
                status:  [this.calendar.status ],
                equipamentId:   [this.calendar.equipamentId ],
                temporaryName:  [this.calendar.temporaryName],
                calendarSpecifications:  this.formBuilder.array(this.calendar.calendarSpecifications),
                calendarEquipamentConsumables: this.formBuilder.array(this.consumableArray),
                calendarSpecificationConsumables: this.formBuilder.array(this.consumableSpecificationArray)
                
            });  
        } 
        
        async loadSpecifications(): Promise<void> {
            await this.specificationSerivce.loadSpecifications().toPromise().then((data) => {
                localStorage.setItem('specificationsList',JSON.stringify(data));
                this.specificationArray = data;
            }); 
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
        
        showSpecifications(item){
            let ret = [];
            if (item.calendarSpecifications.filter(x => x.active).length > 0){
                ret.push(this.descriptionSpecifications(item));
            }
            return ret.join(' - ');
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
        
        createConsumableSpecificationForms(consumables: any): void {
            let specs = JSON.parse(localStorage.getItem('specificationsList'));
            
            for (let item of consumables) {
                
                const spec = specs.find(x => x.id === item.specificationId);
                
                const formGroup = this.formBuilder.group({
                    id: [ ''],
                    name: [{value: spec.name, disabled: true}],
                    active: [item.active],
                    value: [ {value: item.value.toFixed(2).replace('.',','), disabled: true}],
                    initial: [item.initial],
                    final: [item.final ],
                    specificationId: [item.specificationId],
                    calendarId: [null],
                    totalValue: [{value: item.totalValue.toFixed(2).replace('.',','), disabled: true }],
                    createdAt:  new Date()
                });
                
                formGroup.addControl('id', new FormControl(item.id));
                
                this.calendarSpecificationConsumables.push(formGroup);   
            }
        }
        
        createConsumableForms(consumables: any[]): void {
            
            for (let item of consumables) {
                
                const formGroup = this.formBuilder.group({
                    id: [''],
                    name: [item.consumable.name],
                    active: [item.active],
                    value: [item.value.toFixed(2).replace('.',',')],
                    equipamentId: [item.equipamentId],
                    consumableId: [item.consumableId],
                    calendarId: [null],
                    amount: [item.amount],
                    totalValue: [{value: item.totalValue.toFixed(2).replace('.',','), disabled: true}],
                    createdAt: new Date()
                });
                
                formGroup.addControl('id', new FormControl(item.id));
                
                this.calendarEquipamentConsumables.push(formGroup);
            }
            
        }
        
        changeValueEquipamentConsumables(i){
            
            const amount = this.calendarEquipamentConsumables.controls[i].get('amount').value;
            const value = this.calendarEquipamentConsumables.controls[i].get('value').value;
            
            if (value == "")
            return;
            
            const amount_ = parseFloat(amount);
            const value_ = parseFloat(value.toString().replace(',','.'))
            const totalValue = value_ * amount_;
            
            this.calendarEquipamentConsumables.controls[i].get('totalValue').patchValue(totalValue.toFixed(2).replace('.',','))
            this.calculateTotalValue();
        }
        
        changeValueSpecificationConsumables(i){
            
            const initial = this.calendarSpecificationConsumables.controls[i].get('initial').value;
            const final = this.calendarSpecificationConsumables.controls[i].get('final').value;
            const value = this.calendarSpecificationConsumables.controls[i].get('value').value;
            
            if (value == "" || initial == 0 || final == 0)
            return;
            
            const initial_ = parseFloat(initial);
            const final_ = parseFloat(final);
            const value_ = parseFloat(value.toString().replace(',','.'))
            const totalValue = (final_ - initial_) * value_;
            
            this.calendarSpecificationConsumables.controls[i].get('totalValue').patchValue(totalValue.toFixed(2).replace('.',','))
            this.calculateTotalValue();
        }
        
        calculateTotalValue(){
            
            let total = 0;
            const freight = this.form.value.freight;
            const discount = this.form.value.discount;
            
            this.calendarEquipamentConsumables.controls.forEach((control) => {
                
                const currentTotalValue = control.get('totalValue').value.toString();
                const newTotalValue = currentTotalValue.replace(',', '.');
                
                total += parseFloat(newTotalValue);
                console.log('valor equip:' + newTotalValue  );
            });
            
            this.calendarSpecificationConsumables.controls.forEach((control) => {
                
                const currentTotalValue = control.get('totalValue').value.toString();
                const newTotalValue = currentTotalValue.replace(',', '.');
                total += parseFloat(newTotalValue);
                console.log('valor spec:' + newTotalValue  );
                
            });
            
            const value = this.form.get('value').value;
            const value_ = parseFloat(value.replace(',','.'));
            const freight_ = parseFloat(freight.replace(',','.'))
            const discount_ = parseFloat(discount.replace(',','.'))
            
            total += value_ + freight_ - discount_;
            
            const control = this.form.get('totalValue');
            const newValue  = total.toFixed(2).toString().replace('.', ',');
            control.patchValue(newValue);
            
        }
        
        loadConsumableSpecification(): void {
            this.createConsumableSpecificationForms(this.calendar.calendarSpecificationConsumables);
        }
        
        loadConsumables(): void {
            this.createConsumableForms(this.calendar.calendarEquipamentConsumables);
        }
        
        get calendarEquipamentConsumables(): FormArray {
            return this.form.get('calendarEquipamentConsumables') as FormArray;
        }
        
        get calendarSpecificationConsumables(): FormArray {
            return this.form.get('calendarSpecificationConsumables') as FormArray;
        }
        
        adjustFormValues(){
            this.calendarEquipamentConsumables.controls.forEach((control, index) => {
                const currentValue = control.get('value').value.toString();
                const newValue  = currentValue.replace(',', '.');
                control.get('value').patchValue(newValue);
                control.get('value').enable();
                const currentTotalValue = control.get('totalValue').value.toString();
                const newTotalValue = currentTotalValue.replace(',', '.');
                control.get('totalValue').patchValue(newTotalValue);
                control.get('totalValue').enable();
            });
            
            this.calendarSpecificationConsumables.controls.forEach((control, index) => {
                
                const currentValue = control.get('value').value.toString();
                const newValue  = currentValue.replace(',', '.');
                control.get('value').patchValue(newValue);
                control.get('value').enable();
                const currentTotalValue = control.get('totalValue').value.toString();
                const newTotalValue = currentTotalValue.replace(',', '.');
                control.get('totalValue').patchValue(newTotalValue);
                control.get('totalValue').enable();
                
            });
            
            for (const field in this.form.controls) { 
                
                if (field == "discount" || field == "freight" || field == "totalValue" || field == "value"){
                    const control = this.form.get(field);
                    const currentValue = control.value.toString();
                    const newValue  = currentValue.replace(',', '.');
                    control.patchValue(newValue);
                    control.enable();
                }
                
            }
        }
        
        onSubmit(){
            this.adjustFormValues();
            console.log(this.form);
            
            if (this.form.value.date < this.todayDate){
                this.toastr.warning("Essa locação não pode ser alterada.")
            }
            this.calendarService.update(this.form.value).subscribe((resp: Calendar) => {
                this.toastr.success('Lançamento de Consumível atualizado com sucesso!');
                window.location.reload();
            },
            (error: any) =>{
                this.toastr.warning(error.error?.errorMessage)
            }
            );
        }
        
    }
    
    