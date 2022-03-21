
SELECT * from  Address; 
SELECT * from  Buyers; 
SELECT * from  Users; 
SELECT * from  Sellers; 
SELECT * from  Local_Vendors; 
SELECT * from  Categories; 
SELECT * from  Product_Listing; 
SELECT * from  Orders; 
SELECT * from  Credit_Cards; 
SELECT * from  Zipcode_Info; 
SELECT * from  Reviews; 
SELECT * from  Ratings; 
SELECT * from JWTTokenBlocklist; 

SELECT * FROM Users U, Buyers B WHERE U.email = B.email ;
-- DELETE FROM Users where email Like "test%";
SELECT * from Users where email Like "test%";
 
-- DROP TABLE JWTTokenBlocklist;

SELECT * FROM Zipcode_Info WHERE zipcode = 841;
    
SELECT name FROM sqlite_master WHERE type = "table";



PRAGMA table_info(Address);
PRAGMA table_info(Buyers);
PRAGMA table_info(Users);
PRAGMA table_info(Sellers);
PRAGMA table_info(Local_Vendors);
PRAGMA table_info(Categories);
PRAGMA table_info(Product_Listing);
PRAGMA table_info(Orders);
PRAGMA table_info(Credit_Cards);
PRAGMA table_info(Zipcode_Info);
PRAGMA table_info(Reviews);
PRAGMA table_info(Ratings); 
PRAGMA table_info(JWTTokenBlocklist);