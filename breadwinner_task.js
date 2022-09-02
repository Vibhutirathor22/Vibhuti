import { LightningElement,wire,api,track } from 'lwc';
import fetchInv from '@salesforce/apex/invoice.fetchInv';
import fetchInvPaid from '@salesforce/apex/invoice.fetchInvPaid';
import fetchInvDue from '@salesforce/apex/invoice.fetchInvDue';
import fetchIvtotalrec from '@salesforce/apex/invoice.fetchIvtotalrec';
import fetchInvThirty from '@salesforce/apex/invoice.fetchInvThirty';
import fetchInvtSixty from '@salesforce/apex/invoice.fetchInvtSixty';
import fetchInvNinty from '@salesforce/apex/invoice.fetchInvNinty';
import fetchInvNintyP from '@salesforce/apex/invoice.fetchInvNintyP';
import totalOverdue from '@salesforce/apex/invoice.totalOverdue';
export default class invoice extends LightningElement {
    
    @track Columns = [
        { label: 'Invoice number', fieldName: 'Id', type: 'url',typeAttributes: {label: {fieldName: 'Name'}, target: '_blank'} ,sortable: "true"},
        { label: 'Invoice Date', fieldName: 'Invoice_Date__c',type:'Date',sortable: "true"},
        { label: 'Due Date', fieldName: 'Due_Date__c',type:'Date',sortable: "true"},
        { label: 'Amount Paid', fieldName: 'Amount_Paid__c', type: 'Amount_Paid__c',type: 'currency',sortable: "true"},
        { label: 'Total', fieldName: 'Total__c', type: 'currency',sortable: "true" },
        { label: 'Status', fieldName: '', cellAttributes: { iconName: { fieldName: 'Status__c' } , class: { fieldName: 'variant' }},sortable: "true"},
    ];
    @track data;
    @track sortBy='Name';
    @track sortDirection='asc';
     @track accname;
    @track error;
    @track su;
    @track invPaid ;
    @track invDue ;
    @track invThirty;
    @track invSixty;
    @track invNinty;
    @track invNintyP;
    @track invTotalOverdue;
    @track invTotRec;
    @api recordId;
    @wire(fetchInv,{RecId:'$recordId' , field : '$sortBy',sortOrder : '$sortDirection'})
        wiredvoice({ error,data}) 
        {
            if (data) {
           let invParsedData=JSON.parse(JSON.stringify(data));
            invParsedData.forEach(inv => {
                if(inv.Id){
                //inv.Parent_invount_Name=inv.Parent.Name;
                inv.Id='/lightning/r/Invoice__c/'+inv.Id+'/view';
                inv.label=inv.Name;
                if(inv.Status__c.includes("Paid")){
                    inv.Status__c='action:priority';
                    inv.variant='slds-icon slds-icon-text-success';
                }else if(inv.Status__c.includes("Overdue"))
                {
                    inv.Status__c='action:priority';
                    inv.variant='slds-icon slds-icon-text-error';
                }
                else{
                    inv.Status__c='action:priority';
                    inv.variant='slds-icon slds-icon-text-warning';
                }
                }
            });
            this.data = invParsedData;
            this.accname=invParsedData[0].Account__r.Name;
            } else if (error) {
                this.error = error;
            }
        }
        @wire(fetchInvPaid,{RecId:'$recordId'})invPaid;
        @wire(fetchInvDue,{RecId:'$recordId'})invDue;
        @wire(fetchInvThirty,{RecId:'$recordId'})invThirty;
        @wire(fetchInvtSixty,{RecId:'$recordId'})invSixty;
        @wire(fetchInvNinty,{RecId:'$recordId'})invNinty;
        @wire(fetchInvNintyP,{RecId:'$recordId'})invNintyP;
        @wire(totalOverdue,{RecId:'$recordId'})invTotalOverdue;  
        @wire(fetchIvtotalrec,{RecId:'$recordId'})invTotRec;

        doSorting(event) {
            // calling sortdata function to sort the data based on direction and selected field
            this.sortBy = event.detail.fieldName;
            this.sortDirection = event.detail.sortDirection;
        }

        
    }
