# Cakes

### GET ALL CAKES
[GET] 
```
localhost:3000/cakes/list
```

### GET CAKE BY ID
[GET] 
```
localhost:3000/cakes/getById?id=10
```

### GET CAKE BY NAME
```
[GET] 
localhost:3000/cakes/getByName?name=tết
```

### GET CAKE BY ID_TYPE
```
[GET] 
localhost:3000/cakes/getByIdType?id=0
```

# -------------------------------------------

# Bills

### GET ALL BILLS
```
[GET] 
localhost:3000/bills/list
```

### GET BILL BY ID
```
[GET] 
localhost:3000/bills/getById?id=2
```

### GET BILL BY ID_CLIENT
```
[GET] 
localhost:3000/bills/getByIdClient?id=7
```

### GET BILL BY DELIVERY DATE
```
[GET] 
localhost:3000/bills/getByDeliveryDate?startDate=2024-01-30 10:10:00.096&endDate=2024-02-1 10:10:00.096
```

### GET BILL BY CREATED DATE
```
[GET] 
localhost:3000/bills/getByCreatedDate?startDate=2024-01-28 10:10:00.096&endDate=2024-02-1 10:10:00.096
```

### Create Total Bill

```
[POST] 
localhost:3000/bills/createTotal

* body: 
    {
        "name":"Nguyen Van A",
        "phone_number": "0987654321",
        "address":"Ha Dong",
        "delivery_date": "2024-01-31 10:10:00.096 +00:00",
        "notice": "banh mau vang",
        "list_order":[
            {"id_cake":1,"size":2,"quantity":3}
        ]
    }
```

### Create Bill
```
[POST] 
localhost:3000/bills/create

*body:
    {
        "id_client":7,
        "notice":"it ngot",
        "delivery_date":"2024-01-31 10:10:00.096 +00:00"
    }
```

### Update Bill
```
[POST] 
localhost:3000/bills/update

*body:
    {
        "id":5,
        "id_client":7,
        "notice":"nhieu kem",
        "delivery_date":"2024-01-31 10:10:00.096 +00:00"
    }
```

### Delete Bill
```
[DELETE] 
localhost:3000/bills/delete?id=5
```

# -------------------------------------------

# Client

### GET ALL CLIENT
```
[GET] 
localhost:3000/clients/list
```

### GET CLIENT BY ID
```
[GET] 
localhost:3000/clients/getById?id=7
```

### GET CLIENT BY NAME
```
[GET] 
localhost:3000/clients/getByName?name=dat
```

### GET CLIENT BY PHONENUMBER
```
[GET] 
localhost:3000/clients/getByPhoneNumber?phoneNumber=0912563726
```

### GET CLIENT BY ADDRESS
```
[GET] 
localhost:3000/clients/getByAddress?address=noi
```

### CREATE CLIENT
```
[POST]
localhost:3000/clients/create

*body:
    {
        "name":"do van A",
        "phone_number": "0987123456" ,
        "address": "Ha Dong"
    }
```

### UPDATE CLIENT
```
[POST]
localhost:3000/clients/create

*body:
    {
        "id": 7,
        "name":"Luu Thi C",
        "phone_number": "0987123456" ,
        "address": "Ha Dong"
    }
```

### DELETE CLIENT
```
[DELETE]
localhost:3000/clients/delete?id=6
```

# -------------------------------------------

# Order

### Create Order
```
[POST]
localhost:3000/orders/create

*body:
    {
        "id_cake":18,
        "size": "21x8cm",
        "id_bill":5,
        "quantity":1
    }
```

### Update Order
```
[POST]
localhost:3000/orders/update

*body:
    {
        "id":10,
        "id_cake":15,
        "size": "21x8cm",
        "id_bill":3,
        "quantity":8
    }
```

### Delete Order
```
[DELETE]
localhost:3000/orders/delete?id=7
```