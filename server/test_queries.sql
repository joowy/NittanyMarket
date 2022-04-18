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
SELECT * FROM Product_Listing where seller_email = "dnaughton9f@nsu.edu";

 SELECT *
FROM Orders where buyer_email ="abattrick5k@nsu.edu" ;

DELETE FROM Orders where buyer_email ="abattrick5k@nsu.edu" ;


SELECT *
FROM Reviews where seller_email = "nrideoutmi@nsu.edu" and listing_id = 315;

SELECT Count(*)
FROM Reviews GROUP by seller_email, listing_id HAVING Count(*) > 0

SELECT * from Local_Vendors where email = "dnaughton9f@nsu.edu" ;


SELECT *
FROM Ratings where seller_email = "abattrick5k@nsu.edu"


SELECT * FROM Product_Listing where Category = "Bottoms"