SELECT *
FROM Address;
SELECT *
FROM Buyers;
SELECT *
FROM Users;
SELECT *
FROM Sellers;
SELECT *
FROM Local_Vendors;
SELECT *
FROM Categories;
SELECT *
FROM Product_Listing;
SELECT *
FROM Orders;
SELECT *
FROM Credit_Cards;
SELECT *
FROM Zipcode_Info;
SELECT *
FROM Reviews;
SELECT *
FROM Ratings;
SELECT *
FROM JWTTokenBlocklist;

SELECT *
FROM Cart;


SELECT *
FROM Users U,
    Buyers B
WHERE U.email = B.email;
-- DELETE FROM Users where email Like "test%";
SELECT *
FROM Users
WHERE email LIKE "test%";
SELECT *
FROM Zipcode_Info
WHERE zipcode = 841;
SELECT name
FROM sqlite_master
WHERE type = "table";
PRAGMA table_info (Address);
PRAGMA table_info (Buyers);
PRAGMA table_info (Users);
PRAGMA table_info (Sellers);
PRAGMA table_info (Local_Vendors);
PRAGMA table_info (Categories);
PRAGMA table_info (Product_Listing);
PRAGMA table_info (Orders);
PRAGMA table_info (Credit_Cards);
PRAGMA table_info (Zipcode_Info);
PRAGMA table_info (Reviews);
PRAGMA table_info (Ratings);
PRAGMA table_info (JWTTokenBlocklist);
PRAGMA table_info (Cart);

SELECT *
FROM Zipcode_Info
WHERE zipcode = 840;
 

-- DROP TABLE Zipcode_Info;
-- DROP TABLE Address;
-- DROP TABLE Product_Listing;
-- DROP TABLE Categories;
 
 DROP table Buyers; 
 Drop table Sellers;
 
 Drop table Cart;

-- Delete FROM Product_Listing where seller_email = "abattrick5k@nsu.edu";
SELECT * FROM Product_Listing where seller_email = "abattrick5k@nsu.edu";

SELECT   DISTINCT category
FROM Product_Listing  


SELECT DISTINCT category
FROM Product_Listing;

SELECT * FROM Sellers S , Users U  where S.email = U.email and   S.email = "nrideoutmi@nsu.edu" ; 


SELECT * from Buyers where email not in (SELECT email from Sellers) 
SELECT * FROM   sellers  Where email not in (SELECT email from  Buyers) ; 
SELECT * FROM   Users  Where email in (SELECT email from  Buyers)  and  email in (SELECT email from  Sellers); 