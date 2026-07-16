/**
 * Utilitários para trabalhar com relacionamentos entre entidades.
 *
 * Todas as funções são genéricas e independentes das regras de negócio.
 */

/* ========================================================================== */
/*                                   FIND                                     */
/* ========================================================================== */

/**
 * Retorna todos os registros relacionados por uma chave.
 *
 * Exemplo:
 *
 * getRelated(
 *     tasks,
 *     "groupId",
 *     3
 * )
 */
export function getRelated<
    T,
    K extends keyof T
>(
    collection: T[],
    key: K,
    value: T[K]
): T[] {

    return collection.filter(
        entity => entity[key] === value
    );

}

/**
 * Retorna o primeiro registro relacionado.
 */
export function getFirstRelated<
    T,
    K extends keyof T
>(
    collection: T[],
    key: K,
    value: T[K]
): T | undefined {

    return collection.find(
        entity => entity[key] === value
    );

}

/**
 * Verifica se existe algum relacionamento.
 */
export function hasRelated<
    T,
    K extends keyof T
>(
    collection: T[],
    key: K,
    value: T[K]
): boolean {

    return collection.some(
        entity => entity[key] === value
    );

}

/* ========================================================================== */
/*                                  MAPS                                      */
/* ========================================================================== */

/**
 * Cria um índice utilizando uma propriedade como chave.
 *
 * Exemplo:
 *
 * const users = indexBy(usersList, "id");
 *
 * users.get(10)
 */
export function indexBy<
    T,
    K extends keyof T
>(
    collection: T[],
    key: K
): Map<T[K], T> {

    return new Map(

        collection.map(entity => [

            entity[key],
            entity

        ])

    );

}

/**
 * Agrupa elementos utilizando uma propriedade.
 *
 * Exemplo:
 *
 * groupBy(tasks, "groupId")
 */
export function groupBy<
    T,
    K extends keyof T
>(
    collection: T[],
    key: K
): Map<T[K], T[]> {

    const map = new Map<T[K], T[]>();

    for (const entity of collection) {

        const value = entity[key];

        const list = map.get(value);

        if (list) {

            list.push(entity);

        } else {

            map.set(
                value,
                [entity]
            );

        }

    }

    return map;

}