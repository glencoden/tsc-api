import { ModelStatic, Model } from 'sequelize';
import { TSequelizeOrmProps } from '../../db/types/TSequelizeOrmProps';
import SequelizeOrm from '../../db/SequelizeOrm';
import deckModel from './models/deck';
import cardModel from './models/card';


class ApiOrm extends SequelizeOrm {
    Deck: ModelStatic<Model>;
    Card: ModelStatic<Model>;

    constructor(props: TSequelizeOrmProps) {
        super(props);

        this.Deck = this.sequelize.define('Deck', deckModel);
        this.Card = this.sequelize.define('Card', cardModel);
    }
}

export default ApiOrm;