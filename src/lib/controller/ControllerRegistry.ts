import { Type } from "@decorators/express/lib/src/middleware";

export class ControllersRegistry {
	private static controllers: Type[] = [];

	public static addController(type: Type): void {
		if (ControllersRegistry.getController(type) === undefined) {
			ControllersRegistry.controllers.push(type);
		}
	}

	public static removeController(path: string): void {
		delete ControllersRegistry.controllers[path];
	}

	public static getController(type: Type): Type | undefined {
		return ControllersRegistry.controllers.filter(t => t === type)[0];
	}

	public static getControllers(): Type[] {
		return ControllersRegistry.controllers;
	}
}
