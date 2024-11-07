import { executeTransaction } from "../database/database";
import { StringBuilderUtils } from "../utils/StringBuilderUtils";

export type Tarefa = {
  id?: number;
  titulo: string;
  desc: string;
  materia: string;
  prof: string;
  data: string;
  completo: string;
};

export default class TaskRepository {
  private tableName: string = "tarefas";

  constructor() {
    this.up();
  }

  private async up(): Promise<void> {
    const sb: StringBuilderUtils = new StringBuilderUtils();
    sb.append(`CREATE TABLE IF NOT EXISTS ${this.tableName} (`);
    sb.append("id INTEGER PRIMARY KEY AUTOINCREMENT, ");
    sb.append("titulo TEXT NOT NULL, ");
    sb.append("descricao TEXT NOT NULL, ");
    sb.append("materia TEXT NOT NULL, ");
    sb.append("professor TEXT NOT NULL, ");
    sb.append("data TEXT NOT NULL, ");
    sb.append("terminada TEXT NOT NULL);");
    const sql: string = sb.toString();
    await executeTransaction(sql);
  }

  public async down(): Promise<void> {
    await executeTransaction(`DROP TABLE ${this.tableName}`);
  }

  public async create(task: Tarefa): Promise<number | undefined> {
    const sql = `INSERT INTO ${this.tableName} (titulo, descricao, materia, professor, data, terminada) VALUES (?, ?, ?, ?, ?, ?)`;
    const args: (string | number | null)[] = [
      task.titulo,
      task.desc,
      task.materia,
      task.prof,
      task.data,
      task.completo , // Converter booleano para inteiro
    ];
    const result = await executeTransaction(sql, args);
    return result.insertId;
  }

  public async listTasks(): Promise<Tarefa[]> {
    const tasks: Tarefa[] = [];
    const sql: string = `SELECT * FROM ${this.tableName}`;
    const resultSet = await executeTransaction(sql);

    for (let i = 0; i < resultSet.rows.length; i++) {
      const task = resultSet.rows.item(i);
      tasks.push({
        id: task.id,
        titulo: task.titulo,
        desc: task.descricao,
        materia: task.materia,
        prof: task.professor,
        data: task.data,
        completo: task.terminada , // Converter inteiro para booleano
      });
    }
    return tasks;
  }

  public async updateTask(task: Tarefa): Promise<void> {
    const sql = `UPDATE ${this.tableName} SET titulo = ?, descricao = ?, materia = ?, professor = ?, data = ?, terminada = ? WHERE id = ?`;
    const args: (string | number | null)[] = [
      task.titulo,
      task.desc,
      task.materia,
      task.prof,
      task.data,
      task.completo , // Converter booleano para inteiro
      task.id!,
    ];
    await executeTransaction(sql, args);
  }

  public async deleteTask(id: number): Promise<void> {
    const deleteSql: string = `DELETE FROM ${this.tableName} WHERE id = ?`;
    await executeTransaction(deleteSql, [id]);
  }
}
