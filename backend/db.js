const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://hemrajsaini8078:aNCeSvdEFE5yKVNK@cluster0.klilxg0.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to the database");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection("foodCategory");

    const catData = await foodCategory.find({}).toArray();

    global.food_items=data;
    global.foodCategory=catData;
    console.log(global.food_items);
    console.log(global.foodCategory)
  } catch (error) {
      console.error("Error connecting to the database:", error);
  }
};
module.exports = connectToDatabase;

