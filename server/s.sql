
SELECT * from  Address; 
SELECT * from  Buyers; 
SELECT * from  Users; 
SELECT * from  Sellers; 
SELECT * from  Local_Vendor; 
SELECT * from  Categories; 
SELECT * from  Product_Listings; 
SELECT * from  Orders; 
SELECT * from  Credit_Card; 
SELECT * from  Zipcode_Info; 
SELECT * from  Reviews; 
SELECT * from  Rating; 

SELECT * FROM Users U, Buyers B WHERE U.email = B.email;
 
    
 SELECT name FROM sqlite_master WHERE type = "table";

PRAGMA table_info(Users);
PRAGMA table_info(Buyers);
PRAGMA table_info(Sellers);
PRAGMA table_info(Categories);
PRAGMA table_info(Local_Vendor);
PRAGMA table_info(Product_Listings);

