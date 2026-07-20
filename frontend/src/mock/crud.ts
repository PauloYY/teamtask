/**
 * CRUD genérico para coleções em memória.
 *
 * Todas as entidades do banco mockado devem possuir um ID numérico.
 */

export interface BaseEntity {
    id: number;
}

/* ========================================================================== */
/*                                   READ                                     */
/* ========================================================================== */

/**
 * Retorna todos os elementos da coleção.
 */
export function findAll<T extends BaseEntity>(
    collection: T[]
): T[] {

    return collection;

}

/**
 * Procura o primeiro elemento que satisfaça uma condição.
 */
export function findOne<T>(
    collection: T[],
    predicate: (entity: T) => boolean
): T | undefined {

    return collection.find(predicate);

}

/**
 * Procura um elemento pelo ID.
 */
export function findById<T extends BaseEntity>(
    collection: T[],
    id: number
): T | undefined {

    return findOne(
        collection,
        entity => entity.id === id
    );

}

/**
 * Retorna todos os elementos que satisfaçam uma condição.
 */
export function filter<T>(
    collection: T[],
    predicate: (entity: T) => boolean
): T[] {

    return collection.filter(predicate);

}

/**
 * Retorna uma nova coleção ordenada.
 *
 * Não modifica a coleção original.
 */
export function sortBy<T>(
    collection: T[],
    selector: (entity: T) => string | number | Date,
    ascending: boolean = true
): T[] {

    return [...collection].sort((a, b) => {

        const first = selector(a);
        const second = selector(b);

        if (first < second) {
            return ascending ? -1 : 1;
        }

        if (first > second) {
            return ascending ? 1 : -1;
        }

        return 0;

    });

}

/**
 * Verifica se existe algum elemento que satisfaça uma condição.
 */
export function exists<T>(
    collection: T[],
    predicate: (entity: T) => boolean
): boolean {

    return findOne(
        collection,
        predicate
    ) !== undefined;

}

/**
 * Retorna a quantidade de elementos da coleção.
 */
export function count<T>(
    collection: T[]
): number {

    return collection.length;

}

/* ========================================================================== */
/*                                  CREATE                                    */
/* ========================================================================== */

/**
 * Cria uma nova entidade.
 */
export function create<T extends BaseEntity>(
    collection: T[],
    entity: Omit<T, "id">
): T {

    const newEntity = {
        id: getNextId(collection),
        ...entity
    } as T;

    collection.push(newEntity);

    return newEntity;

}

/* ========================================================================== */
/*                                  UPDATE                                    */
/* ========================================================================== */

/**
 * Atualiza uma entidade.
 */
export function update<T extends BaseEntity>(
    collection: T[],
    id: number,
    entity: Partial<Omit<T, "id">>
): T | undefined {

    const current = findById(
        collection,
        id
    );

    if (!current) {
        return undefined;
    }

    Object.assign(current, entity);

    return current;

}

/* ========================================================================== */
/*                                  DELETE                                    */
/* ========================================================================== */

/**
 * Remove uma entidade.
 */
export function remove<T extends BaseEntity>(
    collection: T[],
    id: number
): boolean {

    const index = collection.findIndex(
        entity => entity.id === id
    );

    if (index === -1) {
        return false;
    }

    collection.splice(index, 1);

    return true;

}

/* ========================================================================== */
/*                                  PRIVATE                                   */
/* ========================================================================== */

/**
 * Retorna o próximo ID disponível.
 */
function getNextId<T extends BaseEntity>(
    collection: T[]
): number {

    if (collection.length === 0) {
        return 1;
    }

    return Math.max(
        ...collection.map(entity => entity.id)
    ) + 1;

}