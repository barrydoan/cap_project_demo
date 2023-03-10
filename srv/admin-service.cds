using { com.sap.productcatalog as my } from '../db/schema';

service AdminService  {
  entity Products as projection on my.Products;
  entity Suppliers as projection on my.Suppliers;
  entity Categories as select from my.Categories;
  entity Orders as select from my.Orders;
}

annotate AdminService.Orders with @(restrict: [
  {grant: 'READ', to: 'admin'}
]);