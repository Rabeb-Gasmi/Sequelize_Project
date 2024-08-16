
module.exports=(sequelize,DataTypes)=>{


const User= sequelize.define('User',{
      firstName:{
        field:'firstName',
        type:DataTypes.STRING,
        allowNull:false
    },
      email:{
        field:'email',
        type:DataTypes.STRING,
        allowNull:false  //tasma7 llattribu haka ikoun faregh ou non
    },
    password:{
        field:'password',
        type:DataTypes.STRING,
        allowNull:false
    }
})
User.associate=models=>{
    User.hasMany(models.Product,{
        onDelate:'cascade'
    })
    User.hasOne(models.Profil,{
        onDelate:'cascade'
    })
}

return User;

}