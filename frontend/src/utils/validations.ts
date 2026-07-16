/**
 * Funções utilitárias para validação.
 *
 * Estas funções não dependem de nenhuma entidade do projeto e podem
 * ser utilizadas por qualquer service.
 */

/* ========================================================================== */
/*                                   STRING                                   */
/* ========================================================================== */

/**
 * Verifica se uma string está vazia.
 */
export function isBlank(value: string): boolean {

    return value.trim().length === 0;

}

/**
 * Verifica se uma string possui comprimento mínimo.
 */
export function hasMinLength(
    value: string,
    min: number
): boolean {

    return value.trim().length >= min;

}

/**
 * Verifica se uma string possui comprimento máximo.
 */
export function hasMaxLength(
    value: string,
    max: number
): boolean {

    return value.trim().length <= max;

}

/* ========================================================================== */
/*                                   EMAIL                                    */
/* ========================================================================== */

/**
 * Verifica se um email possui formato válido.
 */
export function isValidEmail(
    email: string
): boolean {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

/**
 * Valida um email.
 *
 * Retorna null caso seja válido.
 */
export function validateEmail(
    email: string
): string | null {

    if (isBlank(email)) {
        return "O email é obrigatório.";
    }

    if (!isValidEmail(email)) {
        return "Email inválido.";
    }

    return null;

}

/* ========================================================================== */
/*                                   DATES                                    */
/* ========================================================================== */

/**
 * Verifica se uma data é válida.
 */
export function isValidDate(
    value: string
): boolean {

    return !Number.isNaN(
        Date.parse(value)
    );

}

/**
 * Verifica se uma data é anterior à outra.
 */
export function isBefore(
    first: string,
    second: string
): boolean {

    return new Date(first) < new Date(second);

}

/**
 * Verifica se uma data é posterior à outra.
 */
export function isAfter(
    first: string,
    second: string
): boolean {

    return new Date(first) > new Date(second);

}

/* ========================================================================== */
/*                                    ENUM                                    */
/* ========================================================================== */

/**
 * Verifica se um valor pertence a um enum.
 */
export function isEnumValue<T extends string>(
    value: string,
    values: readonly T[]
): value is T {

    return values.includes(value as T);

}