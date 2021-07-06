module.exports = (sequelize, Sequelize) => {
  const EmployeeInfo = sequelize.define(
    "employeeInfos",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      empid: {
        type: Sequelize.INTEGER,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATEONLY,
      },
      mobile: {
        type: Sequelize.DOUBLE,
      },
      city: {
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

  return EmployeeInfo;
};
