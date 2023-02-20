import category from "../models/Category.js";

const store = async (req, res) => {
  try {
    const { title } = req.body;

    if(!title){
        return res.status(422).json({
            status : false,
            message: 'Title is required!'
        })
    }
    const newCategory = new category({
      title,
    });
    const Category = await newCategory.save();
    if (!Category) {
      throw { code: 500, message: "Store Category Failed!" };
    }
    return res.status(200).json({
      status: true,
      category: Category,
    });
  } catch (err) {
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export {store}