@isTest
public class invoices_test {
    
     static testmethod void invoice(){
      
        Account acc = New Account();
        acc.Name = 'vibhu';
         Insert acc;
         invoice.fetchInv(acc.Id);
         invoice.fetchInvPaid(acc.Id);
         invoice.fetchInvDue(acc.Id);
         invoice.fetchInvtotalrec(acc.Id);
         invoice.fetchInvThirty(acc.Id);
         invoice.fetchInvtSixty(acc.Id);
         invoice.fetchInvNinty(acc.Id);
         invoice.fetchInvNintyP(acc.Id);
         invoice.totalOverdue(acc.Id);
         invoice.fetchInvTotOver(acc.Id);
    }
 }
