
module.exports=(sequelize,DataTypes)=>{

const Product = sequelize.define("Product", {

  name: {
    field: "name",
    type: DataTypes.STRING,
    allowNull: false,
  },
 price: {
    field: "price",
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Product.associate = models => {
 Product.belongsTo(models.User, {
    onDelate: "cascade",
  });
};

return Product;
}