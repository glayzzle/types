/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */

// https://github.com/glayzzle/php-reflection
declare module "php-reflection" {

    class EventEmitter {
        addListener(type: any, listener: any): any;
        emit(type: any, ...args: any[]): EventEmitter;
        eventNames(): any;
        getMaxListeners(): any;
        listenerCount(type: any): any;
        listeners(type: any): any;
        on(type: any, listener: any):EventEmitter;
        once(type: any, listener: any): EventEmitter;
        prependListener(type: any, listener: any): any;
        prependOnceListener(type: any, listener: any): any;
        removeAllListeners(type: any, ...args: any[]): any;
        removeListener(type: any, listener: any): any;
        setMaxListeners(n: any): any;
    }

    interface Options {
        // list of excluded directory names
        exclude?: String[];
        // list of included directories
        include?: String[];
        // list of php extension files
        ext?: String[];
        // extract vars from each scope (functions, classes)
        // may use memory but could be usefull for resolving
        // their type (on autocompletion)
        scanVars?: Boolean;
        // extract scopes from
        scanExpr?: Boolean;
        // default parsing encoding
        encoding?: String;
        // should spawn a worker process to avoir blocking
        // the main loop (may be slower with small projects or single cpu)
        forkWorker?: Number|Boolean,
        // use the file mtime property to check changes
        cacheByFileDate?: Boolean;
        // use the file size to detect changes
        cacheByFileSize?: Boolean;
        // use an hash algorithm to detect changes
        // if low cache hit, may slow down the parsing
        cacheByFileHash?: Boolean;
        // avoid to load the full cache repository
        // just loads files when they are requested
        // define a function that receives the filename in argumen
        // and return the file cached structure
        lazyCache?: (type: String, name: String) => any;
        // used in order to shard big projects into separate files
        shardSize?: Number;
        // used in order group together symbol from a same file
        shardCapacity?: Number;
    }

    interface Node {
    }

    interface Namespace extends Node {
    }

    interface File extends Node {
    }

    /**
     * The repository
     */
    export default class Repository extends EventEmitter {
        directory: String;
        options: Options;
        constructor(directory:String, config: Options);
        constructor(directory:String);
        on(evt: String, callback: Function): EventEmitter;
        once(evt: String, callback: Function): EventEmitter;
        emit(evt: String, options: any): EventEmitter;
        emit(evt: String): EventEmitter;
        scan(directory: String): Promise<Boolean>;
        scan(): Promise<Boolean>;
        scope(filename: String, offset: Number): Promise<File>;
        cache(): Object;
        cache(data: any): Repository;
        cleanAll(): Repository;
        each(cb: (item: File) => void): Repository;
        get(filename: String): Promise<File>;
        parse(filename: String, encoding?: String, stat?: any): Promise<File>;
        getByName(type: String, name: String, limit?: Number): Node[];
        getByType(type: String, limit?: Number): Node[];
        getFirstByName(type: String, name: String): Node;
        getNamespace(name: String): Namespace;
        refresh(filename: any, encoding: any, stat: any): Promise<File>;
        remove(filename: String): Promise<Boolean>;
        rename(oldName: String, newName: String): Promise<Boolean>;
    }

}
