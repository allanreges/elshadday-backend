import Sequelize, { Model } from 'sequelize';

class ProductReservations extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        enabled: Sequelize.BOOLEAN,
        description: Sequelize.STRING,
        product: Sequelize.STRING,
        price: Sequelize.INTEGER,
        phone: Sequelize.STRING,
        amount: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ProductReservations;
