Comparison Operators

// eq - equal
// ne = not equal 
// lt = less than 
// gt = greater than 
// lte = less than and equal 
// gte = greater than and equal 
// in = contains in 
// nin = not contains in

//method to apply filter
db.students.find({age:{$eq:5}})

// in and nin get array in queries 
//gives all with age 5 and 12
db.students.find({age:{$in:[5,12]}})

// if any value has a type object
// like identity: {hasPanCard:true,hasAdhaarCard:true }
// and we have to find all the collection components who has adhaar card, then 
db.students.find({identity.hasAdhaarCard:true}) gives you wrong result 
// except this do 
db.students.find({'identity.hasAdhaarCard':true});

Logical Operators 

// and - to join two queries 
// or - if we want to get result if any query satifies the condition
// nor - if we dont want to get from both queries
// not - except this 

// method to apply these 
db.students.find({$or:[{age:{$lte:10}},{age:{$gte:12}}]})

// imagine the difference
db.students.find({$and:[{age:{$lt:11}},{Hobbies: 'Walk'}]})
// and 
db.students.find({age:{$lt:11},Hobbies:'Walk'})
// this is going to be give the same data for both above queries but
// if we apply query on same value of component(i.e age and age), then 2nd case will only consider 2nd condition
db.students.find({{age:{$lte:10}},{age:{$gte:12}}})
// this will result into only giving data with age greater or equal to 12
//  so here is the exact use of and logical operator


Element Query Operators 

// exists - if we have to find the components in a collection where any field exists of not, then we can use this 
// type - if fielt has multiple datatype, then it gets all the components in which type of than field is as specified by user 

// Usage
db.students.find({age:{$exists:true}})
//type accepts value based on number of the following datatype like for boolean its 8
db.students.find({hasMacBook:{$exists:true,$type:8 }})
// or you can also write it as like 
db.students.find({hasMacBook:{$exists:true,$type:"bool" }})


Evaluation Operators 
// expr - gives the result of the expression
// regex - gives all the details with the following expression like names start with 'A'
// text - gives all the details containing the text you want to search
// to use text datatype of the document component must be text
// mod - gives all the documents where finding mod of specified field gets the value we want 

db.collection.find({
    $expr:{$gt:["price",{$avg:"price"}]}
})
// gives all documents where the value of price field is greater than the avg price of all field in documents

db.students.find({name:{$regex:/^A/}})
//gives all the name documents starting with A

db.students.find({$text:{$search:"youtube"}})
// gives all the documents which contains youtube word

db.collection.find({quantity:{$mod:[3,0]}});
// gives all the documents where quantityvalue is exactly divisible by 3

https://www.youtube.com/watch?v=wPL2i8KHKTI&list=PLA3GkZPtsafZydhN4nP0h7hw7PQuLsBv1&index=23&ab_channel=EngineeringDigest
// for best revising queries

// sort - gives all the documents after sorting the whole collection according to given field
// receives 2 arguments (1 and -1)
// 1 for ascending -1 for descending
db.collection.find().sort({age:1});















