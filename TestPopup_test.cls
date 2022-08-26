@istest
public class TestPopup_test {
   static testmethod void TestPopup(){
       Invoice__c inv=new Invoice__c();

           insert inv;
       
       Test.setCurrentPageReference(new PageReference('Page.myPage')); 
        System.currentPageReference().getParameters().put('id', inv.id);
       TestPopup invs = new TestPopup();
       invs.SelectedInvoiceId=inv.id;
         invs.boost=true;
         invs.tid=inv.id;
         invs.DetailController();
        invs.InvoiceListController();
        invs.saveInvoice();
        invs.showPopup();
        invs.closePopup();
        invs.editData();
        invs.DeleteAccount();
      invs.back();
        invs.sortAscDesc();
       
        invs.sortAscDesc1();
        invs.sortAscDesc2();
        invs.sortAscDesc3();
        invs.sortAscDesc4();
        invs.sortAscDesc5();
        invs.sortAscDesc6();
       invs.sortAscDesc7();
        invs.sortAscDesc8();
       invs.boost=false;
       invs.sortAscDesc();
       
        invs.sortAscDesc1();
        invs.sortAscDesc2();
        invs.sortAscDesc3();
        invs.sortAscDesc4();
        invs.sortAscDesc5();
        invs.sortAscDesc6();
       invs.sortAscDesc7();
        invs.sortAscDesc8();
     
    
    }
     
}
