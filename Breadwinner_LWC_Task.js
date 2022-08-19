import { LightningElement,wire,api } from 'lwc';
import fetchAcc from '@salesforce/apex/invoice.fetchAcc';
export default class invoice extends LightningElement {
    
    @api recordId;
    @wire(fetchAcc,{
        RecId:'$recordId'
    })inv;
   
    
}
