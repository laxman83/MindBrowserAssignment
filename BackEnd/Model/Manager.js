module.exports = (sequelize, Sequelize) => {
  const ManagerInfo = sequelize.define(
    "managerInfos",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
      },
      company: {
        type: Sequelize.STRING,
      },
      created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

  return ManagerInfo;
};
