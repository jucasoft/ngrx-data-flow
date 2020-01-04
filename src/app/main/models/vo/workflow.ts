export class Workflow {
  public id: string = undefined;
  public value: string = undefined;
  public type: string = undefined;
  public name: string = undefined;
  public description: string = undefined;
  public parent: string = undefined;
  public source: string = undefined;
  public target: string = undefined;
  public xx: string = undefined;
  public yy: string = undefined;
  /**
   * metodo statico utilizzato per recuperare l'id dell'entita.
   * @param item
   */
  static selectId: (item: Workflow) => string = item => item.id;
}
