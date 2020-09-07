import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        enabled: Sequelize.BOOLEAN,
        description: Sequelize.STRING,
        classes: Sequelize.STRING,
        price: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.ProductImage, { foreignKey: 'event_id', as: 'images' });
  }
}

export default Product;
