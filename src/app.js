const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionUrl = 'mongodb://127.0.0.1:27017'

const dbname = "task"
mongoClient.connect(connectionUrl, (error, res1) => {
    if (error) {
        return console.log("error has occured")

    }
    console.log('All perfect')

    const db = res1.db(dbname)


    /////1
    db.collection('users').insertOne({
        name: 'alia',
        age: 20
    }, (error, data) => {
        if (error) {
            console.log('Unable to insert data')
        }
    })

    db.collection('users').insertOne({
        name: 'aya',
        age: 25
    }, (error, data) => {
        if (error) {
            console.log('Unable to insert data')
        }
    })



    /////2
    db.collection('users').insertMany(
        [{
            name: 'ahmed',
            age: 27
        },
        {
            name: 'wafaa',
            age: 27
        },

        {
            name: 'khaled',
            age: 27
        },
        {
            name: 'hanan',
            age: 27
        }, {
            name: 'yosif',
            age: 27
        },
        {
            name: 'mahmood',
            age: 29
        },
        {
            name: 'eman',
            age: 21
        },
        {
            name: 'ali',
            age: 22
        },{
            name: 'yara',
            age: 23
        },{
            name: 'amr',
            age: 24
        },


        ], (error, data) => {
            if (error) {
                console.log("unable to insert data")
            }
        }
    )


    /////3
    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        if (error) {
            return console.log('error has occured')

        }
        console.log(users)
    })

    /////4
    db.collection('users').find({ age: 27 }).limit(3).toArray((error, users) => {
        if (error) {
            return console.log('error has occured')

        }

        console.log(users)
    })

    /////5
    db.collection('users').find().limit(4).toArray((error, users) => {
        if (error) {
            return console.log('Error has occurred');
        }

        const ids = users.map(user => user._id);

        db.collection('users').updateMany(
            { _id: { $in: ids } },
            { $set: { name: "modified" } }
        )
        .then((data1) => console.log(data1.modifiedCount))
        .catch((error) => { console.log(error) });
    });
    /////6
    db.collection('users').find({age:27}).limit(4).toArray((error, users) => {
        if (error) {
            return console.log('Error has occurred');
        }

        const ids = users.map(user => user._id);

        db.collection('users').updateMany(
            { _id: { $in: ids } },
            { $inc: { age: 4 } }
        )
        .then((data1) => console.log(data1.modifiedCount))
        .catch((error) => { console.log(error) });
    });
    /////7
    db.collection("users").updateMany({},
        { $inc: { age: 10 } }

    )
        .then((data1) => console.log(data1.modifiedCount))
        .catch((error) => { console.log(error) })


    /////8
    db.collection("users").deleteMany({ age: 41 })
        .then((data1) => { console.log(data1.deletedCount) })
        .catch((error) => { console.log(error) })

})