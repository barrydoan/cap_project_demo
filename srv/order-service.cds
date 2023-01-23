using { com.sap.productcatalog as my } from '../db/schema';

@path:'/order'
service OrderService {

    @readonly entity Categories as projection on my.Categories;
    @readonly entity Suppliers as projection on my.Suppliers;
    entity Orders as projection on my.Orders;
    @readonly entity Products as SELECT from my.Products {
        *,
        category.name as categoryName,
        supplier.name as supplierName
    } excluding { createdBy, modifiedBy };

   

    entity OrderItems as SELECT from my.OrderItems {
        *
    };

}

