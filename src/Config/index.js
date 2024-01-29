import Sequelize from 'sequelize';


const Connection = async () => {
    const sequelize = new Sequelize('postgres', 'postgres', 'MyvzEZF$DYt47i4', {
            host: 'db.anyugtuaguobciopkhcl.supabase.co',
            dialect: 'postgres'
        }
    )
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch(error){
        console.error('Unable to connect to the database:', error);
    }
    return sequelize
}

export default Connection;