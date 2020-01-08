export class Coin {
  public id: string = undefined;
  public value: number = undefined;
  public name: number = undefined;
  public description: number = undefined;
  /**
   * metodo statico utilizzato per recuperare l'id dell'entita.
   * @param item
   */
  static selectId: (item: Coin) => string = item => item.id;
}
