import { Model, Schema, model } from 'mongoose'

export class Repo {
  public model: Model<any>
  public models = new Map()

  constructor(
    name?: string,
    schema?: Schema<any>,
    collection?: string,
    models: Array<{ name: string; schema: Schema<any>; collection: string }> = []
  ) {
    if (name && schema && collection) {
      try {
        this.model = model(name)
      } catch (e) {
        this.model = model(name, schema, collection)
      }
    }

    models.forEach(m => {
      let modelInstance
      try {
        modelInstance = model(m.name)
      } catch (e) {
        modelInstance = model(m.name, m.schema, m.collection)
      }

      return this.models.set(m.name, modelInstance)
    })
  }

  protected getCollectionPipeline(page: number, perPage: number) {
    const pipelines = [
      {
        $project: {
          _id: 0,
          list: '$$ROOT'
        }
      },
      {
        $facet: {
          nbTotal: [{ $count: 'value' }],
          list: [{ $skip: (page - 1) * perPage }, { $limit: perPage }]
        }
      },
      {
        $unwind: {
          path: '$nbTotal',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                list: {
                  $map: {
                    input: '$list',
                    as: 'item',
                    in: '$$item.list'
                  }
                }
              },
              { nbTotal: { $ifNull: ['$nbTotal.value', 0] } },
              { currentPage: page },
              {
                nbPages: {
                  $ifNull: [{ $ceil: { $divide: ['$nbTotal.value', perPage] } }, 0]
                }
              },
              { itemsPerPage: perPage }
            ]
          }
        }
      }
    ]

    return pipelines
  }
}
