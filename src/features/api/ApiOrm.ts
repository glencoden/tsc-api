import { ModelStatic, Model, Op } from 'sequelize';
import { TSequelizeOrmProps } from '../../db/types/TSequelizeOrmProps';
import SequelizeOrm from '../../db/SequelizeOrm';
import eventModel from './models/event';
import competitorModel from './models/competitor';
import { TJson } from '../../types/TJson';

// clear deleted entities older than cacheTime

const cacheTime = 90; // days


class ApiOrm extends SequelizeOrm {
    Event: ModelStatic<Model>;
    Competitor: ModelStatic<Model>;

    constructor(props: TSequelizeOrmProps) {
        super(props);

        this.Event = this.sequelize.define('Event', eventModel);
        this.Competitor = this.sequelize.define('Competitor', competitorModel);
    }

    // get all

    getAll(): Promise<Model[][]> {
        return Promise.all([
            this.Event.findAll(),
            this.Competitor.findAll()
        ]);
    }

    // events

    getEvents(id: number): Promise<Model[]> {
        if (!id) {
            return this.Event.findAll({
                where: { deleted: null }
            });
        }
        return this.Event.findAll({
            where: {
                [Op.and]: [
                    { id },
                    { deleted: null }
                ]
            }
        });
    };

    addEvent(request: TJson): Promise<Model> {
        const {
            name,
            date,
            place,
            host,
            start,
            disciplines,
            gymnastics,
            competitorIds
        } = request;
        return this.Event.create({
            name,
            date,
            place,
            host,
            start,
            disciplines,
            gymnastics,
            competitorIds
        });
    };

    updateEvent(request: TJson): Promise<number[]> {
        return this.Event.update(request, {
            where: {
                id: request.id
            }
        });
    };

    deleteEvent(id: number): Promise<number[]> {
        return this.Event.update(
            {
                deleted: new Date()
            },
            {
                where: { id }
            }
        );
    };

    recoverEvent(id: number): Promise<number[]> {
        return this.Event.update(
            {
                deleted: null
            },
            {
                where: { id }
            }
        );
    }

    // competitors

    getCompetitors(id: number): Promise<Model[]> {
        if (!id) {
            return this.Competitor.findAll({
                where: { deleted: null }
            });
        }
        return this.Competitor.findAll({
            where: {
                [Op.and]: [
                    { id },
                    { deleted: null }
                ]
            }
        });
    };

    addCompetitor(request: TJson): Promise<Model> {
        const {
            id,
            name,
            gender,
            year,
            weight,
            club,
            results
        } = request;
        return this.Competitor.create({
            id,
            name,
            gender,
            year,
            weight,
            club,
            results
        });
    };

    updateCompetitor(request: TJson): Promise<number[]> {
        return this.Competitor.update(request, {
            where: {
                id: request.id
            }
        });
    };

    deleteCompetitor(id: number): Promise<number[]> {
        return this.Competitor.update(
            {
                deleted: new Date()
            },
            {
                where: { id }
            }
        );
    };

    recoverCompetitor(id: number): Promise<number[]> {
        return this.Competitor.update(
            {
                deleted: null
            },
            {
                where: { id }
            }
        );
    }

    clearCache(): Promise<(void | (Promise<void> | Promise<number>)[])[]> {
        const staleDate = new Date();
        staleDate.setMinutes(staleDate.getMinutes() - 60 * 24 * cacheTime);

        const deletedEventIds = this.Event.findAll({
            where: { deleted: { [Op.not]: null } }
        })
            .then(deletedEvents => deletedEvents.map((event: TJson) => {
                if (new Date(event.deleted) < staleDate) {
                    return this.Event.destroy({
                        where: { id: event.id }
                    });
                }
                return Promise.resolve();
            }))
            .catch(console.error);

        const deletedCompetitorIds = this.Competitor.findAll({
            where: { deleted: { [Op.not]: null } }
        })
            .then(deletedCompetitors => deletedCompetitors.map((competitor: TJson) => {
                if (new Date(competitor.deleted) < staleDate) {
                    return this.Event.destroy({
                        where: { id: competitor.id }
                    });
                }
                return Promise.resolve();
            }))
            .catch(console.error);

        return Promise.all([
            deletedEventIds,
            deletedCompetitorIds
        ]);
    }
}

export default ApiOrm;