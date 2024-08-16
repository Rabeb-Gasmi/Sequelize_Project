
module.exports=(sequelize,DataTypes)=>{

const Profil = sequelize.define("Profil", {
  
  firstName: {
    field: "firstName",
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    field: "lastName",
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    field: "country",
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Profil.associate = models=> {

  Profil.belongsTo(models.User, {
    onDelate: "cascade",
  });
};


return Profil
}