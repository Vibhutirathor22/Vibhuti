import { LightningElement,wire,api,track } from 'lwc';
import fetchInv from '@salesforce/apex/invoice.fetchInv';
import fetchInvPaid from '@salesforce/apex/invoice.fetchInvPaid';
import fetchInvDue from '@salesforce/apex/invoice.fetchInvDue';
import fetchInvtotalrec from '@salesforce/apex/invoice.fetchInvtotalrec';
import fetchInvThirty from '@salesforce/apex/invoice.fetchInvThirty';
import fetchInvtSixty from '@salesforce/apex/invoice.fetchInvtSixty';
import fetchInvNinty from '@salesforce/apex/invoice.fetchInvNinty';
import fetchInvNintyP from '@salesforce/apex/invoice.fetchInvNintyP';
import totalOverdue from '@salesforce/apex/invoice.totalOverdue';
export default class invoice extends LightningElement {
    
    @track  Columns = [
        { label: 'Invoice number', fieldName: 'Id', type: 'url',typeAttributes: {label: {fieldName: 'Name'}, target: '_blank'}},
        { label: 'Total', fieldName: 'Total__c', type: 'Currency' },
        { label: 'Invoice Date', fieldName: 'Invoice_Date__c',type: 'date'  },
        { label: 'Due Date', fieldName: 'Due_Date__c',type: 'date' },
        { label: 'Status', fieldName: '', cellAttributes: { iconName: { fieldName: 'Status__c' } , class: { fieldName: 'variant' }}},
        { label: 'Amount Paid', fieldName: 'Amount_Paid__c', type: 'Amount_Paid__c',type: 'Currency'},
        { label: 'Days Overdue', fieldName: 'Days_Overdue__c', type: 'Days_Overdue__c',type: 'Number'}
    ];
    @track error;
    @track invList ;
    @track invPaid ;
    @track invDue ;
    @track invThirty;
    @track invSixty;
    @track invNinty;
    @track invNintyP;
    @track invTotalOverdue;
    @track invTotRec;
    @api recordId;
    @wire(fetchInv,{RecId:'$recordId'})
     
        wiredvoice({
            error,
            data
        }) {
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
            this.invList = invParsedData;
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
        @wire(fetchInvtotalrec,{RecId:'$recordId'})invTotRec;
    }
   
