/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */

// https://github.com/glayzzle/php-parser
declare module "php-parser" {
  /**
   * Token items
   */
  const enum TokenEnum {
    T_HALT_COMPILER = 101,
    T_USE = 102,
    T_ENCAPSED_AND_WHITESPACE = 103,
    T_OBJECT_OPERATOR = 104,
    T_STRING = 105,
    T_DOLLAR_OPEN_CURLY_BRACES = 106,
    T_STRING_VARNAME = 107,
    T_CURLY_OPEN = 108,
    T_NUM_STRING = 109,
    T_ISSET = 110,
    T_EMPTY = 111,
    T_INCLUDE = 112,
    T_INCLUDE_ONCE = 113,
    T_EVAL = 114,
    T_REQUIRE = 115,
    T_REQUIRE_ONCE = 116,
    T_NAMESPACE = 117,
    T_NS_SEPARATOR = 118,
    T_AS = 119,
    T_IF = 120,
    T_ENDIF = 121,
    T_WHILE = 122,
    T_DO = 123,
    T_FOR = 124,
    T_SWITCH = 125,
    T_BREAK = 126,
    T_CONTINUE = 127,
    T_RETURN = 128,
    T_GLOBAL = 129,
    T_STATIC = 130,
    T_ECHO = 131,
    T_INLINE_HTML = 132,
    T_UNSET = 133,
    T_FOREACH = 134,
    T_DECLARE = 135,
    T_TRY = 136,
    T_THROW = 137,
    T_GOTO = 138,
    T_FINALLY = 139,
    T_CATCH = 140,
    T_ENDDECLARE = 141,
    T_LIST = 142,
    T_CLONE = 143,
    T_PLUS_EQUAL = 144,
    T_MINUS_EQUAL = 145,
    T_MUL_EQUAL = 146,
    T_DIV_EQUAL = 147,
    T_CONCAT_EQUAL = 148,
    T_MOD_EQUAL = 149,
    T_AND_EQUAL = 150,
    T_OR_EQUAL = 151,
    T_XOR_EQUAL = 152,
    T_SL_EQUAL = 153,
    T_SR_EQUAL = 154,
    T_INC = 155,
    T_DEC = 156,
    T_BOOLEAN_OR = 157,
    T_BOOLEAN_AND = 158,
    T_LOGICAL_OR = 159,
    T_LOGICAL_AND = 160,
    T_LOGICAL_XOR = 161,
    T_SL = 162,
    T_SR = 163,
    T_IS_IDENTICAL = 164,
    T_IS_NOT_IDENTICAL = 165,
    T_IS_EQUAL = 166,
    T_IS_NOT_EQUAL = 167,
    T_IS_SMALLER_OR_EQUAL = 168,
    T_IS_GREATER_OR_EQUAL = 169,
    T_INSTANCEOF = 170,
    T_INT_CAST = 171,
    T_DOUBLE_CAST = 172,
    T_STRING_CAST = 173,
    T_ARRAY_CAST = 174,
    T_OBJECT_CAST = 175,
    T_BOOL_CAST = 176,
    T_UNSET_CAST = 177,
    T_EXIT = 178,
    T_PRINT = 179,
    T_YIELD = 180,
    T_YIELD_FROM = 181,
    T_FUNCTION = 182,
    T_DOUBLE_ARROW = 183,
    T_DOUBLE_COLON = 184,
    T_ARRAY = 185,
    T_CALLABLE = 186,
    T_CLASS = 187,
    T_ABSTRACT = 188,
    T_TRAIT = 189,
    T_FINAL = 190,
    T_EXTENDS = 191,
    T_INTERFACE = 192,
    T_IMPLEMENTS = 193,
    T_VAR = 194,
    T_PUBLIC = 195,
    T_PROTECTED = 196,
    T_PRIVATE = 197,
    T_CONST = 198,
    T_NEW = 199,
    T_INSTEADOF = 200,
    T_ELSEIF = 201,
    T_ELSE = 202,
    T_ENDSWITCH = 203,
    T_CASE = 204,
    T_DEFAULT = 205,
    T_ENDFOR = 206,
    T_ENDFOREACH = 207,
    T_ENDWHILE = 208,
    T_CONSTANT_ENCAPSED_STRING = 209,
    T_LNUMBER = 210,
    T_DNUMBER = 211,
    T_LINE = 212,
    T_FILE = 213,
    T_DIR = 214,
    T_TRAIT_C = 215,
    T_METHOD_C = 216,
    T_FUNC_C = 217,
    T_NS_C = 218,
    T_START_HEREDOC = 219,
    T_END_HEREDOC = 220,
    T_CLASS_C = 221,
    T_VARIABLE = 222,
    T_OPEN_TAG = 223,
    T_OPEN_TAG_WITH_ECHO = 224,
    T_CLOSE_TAG = 225,
    T_WHITESPACE = 226,
    T_COMMENT = 227,
    T_DOC_COMMENT = 228,
    T_ELLIPSIS = 229,
    T_COALESCE = 230,
    T_POW = 231,
    T_POW_EQUAL = 232,
    T_SPACESHIP = 233
  }

  /**
   * The tokens dictionnary
   */
  interface TokenDefinition {
    /** List of token names as texts */
    values: String[],
    /** Define tokens */
    names: TokenEnum[]
  }

  /**
   * The token structure
   */
  interface Token extends Array<any> {
    // token name
    0: String;
    // the token value
    1: TokenEnum;
    // the current line
    2: Number
  }

  /**
   * Each Position object consists of a line number (1-indexed) and a column number (0-indexed):
   */
  interface Position {
    line: Number;
    column: Number;
    offset: Number;
  }

  /**
   * Defines the location of the node (with it's source contents as string)
   */
  interface Location {
    source: string;
    start: Position;
    end: Position;
  }

  /**
   *
   */
  interface Node {
    kind: String;
    loc: Location;
  }

  /**
   * Error node
   */
  interface ParserError extends Node {
    message: String;
    token: Token;
    line: Number;
    expected: any;
  }

  /**
   * A block statement, i.e., a sequence of statements surrounded by braces.
   */
  interface Block extends Node {
    children: Node[];
  }

  /**
   * The main root node
   */
  interface Program extends Block {
    errors: ParserError[];
  }

  interface Parser {
    lexer: Lexer;
    ast: AST;
    token: TokenEnum;
    prev: TokenEnum;
    debug: Boolean;
    extractDoc: Boolean;
    suppressErrors: Boolean;
    getTokenName(token:TokenEnum): String;
    parse(code: String, filename: String): Program;
    raiseError(message: String, msgExpect: String, expect: any, token: TokenEnum): ParserError;
    error(expect: String): ParserError;
    node(kind:String): Node;
    expectEndOfStatement(): Boolean;
    showlog(): Parser;
    expect(token:TokenEnum): Boolean;
    expect(tokens:TokenEnum[]): Boolean;
    text(): String;
    next(): Parser;
    ignoreComments(): Parser;
    nextWithComments(): Parser;
    is(type: String): Boolean;
    // @todo other parsing functions ...
  }

  interface KeywordsDictionnary {
    [index: string]: TokenEnum
  }

  interface  yylloc {
    first_offset: Number;
    first_line: Number;
    first_column: Number;
    last_line: Number;
    last_column: Number;
  }

  interface LexerState {
    yytext: String;
    offset: Number;
    yylineno: Number;
    yyprevcol: Number;
    yylloc: yylloc;
  }

  interface Lexer {
    debug: Boolean;
    all_tokens: Boolean;
    comment_tokens: Boolean;
    mode_eval: Boolean;
    asp_tags: Boolean;
    short_tags: Boolean;
    keywords: KeywordsDictionnary;
    castKeywords: KeywordsDictionnary;
    setInput(input:String): Lexer;
    input(size:Number): String;
    unput(size:Number): Lexer;
    tryMatch(match:String): Boolean;
    tryMatchCaseless(match:String): Boolean;
    ahead(size:Number): String;
    consume(size:Number): Lexer;
    getState(): LexerState;
    setState(state:LexerState): Lexer;
    appendToken(value:TokenEnum, ahead:Number): Lexer;
    lex(): TokenEnum;
    begin(state:String): Lexer;
    popState(): String;
    next(): TokenEnum;
    // @todo other lexer functions ...
  }


  interface AST {
    /**
     *
     */
    withPositions: Boolean;
    /**
     * Option, if true extracts original source code attached to the node (by default false)
     */
    withSource: Boolean;
    /**
     * Constructor
     */
    constructor(withPositions:Boolean, withSource:Boolean): AST;
    constructor(withPositions:Boolean): AST;
    constructor(): AST;
    /**
     * Create a position node from specified parser
     * including it's lexer current state
     */
    position(parser:Parser): Position;
    /**
     * Prepares an AST node
     */
    prepare(kind:String, parser:Parser): Function;
  }

  /**
   * List of options / extensions
   */
  interface Options {
    ast?: {
        withPositions?: Boolean;
        withSource?: Boolean;
    };
    lexer?: {
        debug?: Boolean;
        all_tokens?: Boolean;
        comment_tokens?: Boolean;
        mode_eval?: Boolean;
        asp_tags?: Boolean;
        short_tags?: Boolean;
    };
    parser?: {
        debug?: Boolean;
        extractDoc?: Boolean;
        suppressErrors?: Boolean;
    };
  }

  /**
   * Initialise a new parser instance with the specified options
   */
  export default class Engine {
    // ----- STATIC HELPERS
    static create(options?: Options) : Engine;
    static parseEval(buffer: String, options: Options)  : Program;
    static parseEval(buffer: String) : Program;
    static parseCode(buffer: String, filename: String, options: Options) : Program;
    static parseCode(buffer: String, options: Options) : Program;
    static parseCode(buffer: String) : Program;
    static tokenGetAll(buffer: String, options: Options) : Token[];
    static tokenGetAll(buffer: String) : Token[];
    // ----- INSTANCE FUNCTIONS
    ast: AST;
    lexer: Lexer;
    parser: Parser;
    tokens: TokenDefinition;
    constructor(options?: Options);
    parseEval(buffer: String) : Program;
    parseCode(buffer: String, filename: String) : Program;
    parseCode(buffer: String) : Program;
    tokenGetAll(buffer: String) : Token[];
  }
}

// nodejs module (if node declared)
declare module "events" {
    export class EventEmitter {
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
}


// https://github.com/glayzzle/php-reflection
declare module "php-reflection" {

    import { graph, point } from "grafine";
    import { EventEmitter } from "events";

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

    /**
     * Each Position object consists of a line number (1-indexed) and a column number (0-indexed):
     */
    interface Position {
        line: Number;
        column: Number;
        offset: Number;
    }

    /**
     * Defines the location of the node (with it's source contents as string)
     */
    interface Location {
        source: string;
        start: Position;
        end: Position;
    }

    class Tag {
        /** @todo from doc-parser */
    }


    class Annotation {
        /** @todo from doc-parser */
    }

    class Comment {
        summary: String;
        tags: any;
        annotations: Annotation[];
        getAnnotation(name: String): Annotation;
        getAnnotations(name: String): Annotation[];
        getTag(name: String): Tag;
        getTags(name: String): Tag[];
        
    }

    class Node extends point {
        position: Location;
        doc: Comment;
        protected consume(file:File, parent: Node, ast: any): void;
        indexName(name: String): Node;
        getRepository(): Repository;
        getFile(): File;
        getParent(): Node;
        getNamespace(): Namespace;
        eachChild(cb: (child: Node, index: Number) => void): Node;
        static extends(type: String): Node;
        static create(type: String, graph: graph): Node;
    }

    class Block extends Node {
    }


    class Namespace extends Block {
    }

    class File extends point {
        getRepository(): Repository;
        setName(name: String): File;
        getName(): String;
        eachNode(cb: (child: Node, index: Number) => void): File;
        getFirstByName(type: String, name: String): Node;
        getByType(type: String): Node[];
        getNamespaces(): Namespace[];
        getClasses(): Class[];
        getInterfaces(): Interface[];
        getIncludes(): Node[];
        getClass(name: String): Class;
        getNamespace(name: String): Namespace;
        getScope(offset: Number[]): Scope;
    }

    class Function extends Block {
        name: String;
        fullName: String;
        isClosure: Boolean;
        getArguments(): Variable[];
        getVariables(): Variable[];
    }

    class Method extends Block {
        name: String;
        fullName: String;
        isStatic: Boolean;
        isFinal: Boolean;
        isAbstract: Boolean;
        isPublic: Boolean;
        isProtected: Boolean;
        isPrivate: Boolean;
        getArguments(): Variable[];
        getVariables(): Variable[];
        getClass(): Class|Trait|Interface;
    }

    class Class extends Node {
        name: String;
        fullName: String;
        extends: String;
        implements: String[];
        isAbstract: Boolean;
        isFinal: Boolean;
        getExtends(): Class;
        getImplements(): Interface[];
        getProperties(includeParents?: Boolean): Property[];
        getConstants(includeParents?: Boolean): Constant[];
        getMethods(includeParents?: Boolean): Method[];
    }

    class Trait extends Node {
    }

    class Interface extends Node {
    }

    class Constant extends Node {
        name: String;
    }

    class Variable extends Node {
        name: String;
    }

    class Property extends Node {
        name: String;
    }

    class Scope {
        file: File;
        offset: Number[];
        namespace: Namespace;
        class: Class;
        trait: Trait;
        interface: Interface;
        method: Method;
        function:  Function;
        variables: Variable[];
    }


    /**
     * The repository
     */
    export default class Repository extends EventEmitter {
        directory: String;
        options: Options;
        db: graph;
        constructor(directory:String, config: Options);
        constructor(directory:String);
        scan(directory: String): Promise<Boolean>;
        scan(): Promise<Boolean>;
        parse(filename: String, encoding?: String, stat?: any): Promise<File>;
        getByType(type: String): Node[];
        getByName(type: String, name: String, limit?: Number): Node[];
        getFirstByName(type: String, name: String): Node;
        getNamespace(name: String): Namespace;
        sync(filename: String, contents: String, offset: Number[]): Boolean|Error;
        cleanAll(): Repository;
        each(type: String, cb: (node:Node, name: String) => void): Repository;
        getScope(filename: String, offset: any): Scope;
        getFile(filename: String): File;
        hasFile(filename: String): Boolean;
        eachFile(cb: (node:File, name: String) => void): Repository;
        removeFile(filename: String): Repository;
        renameFile(oldName: String, newName: String): Repository;
        refresh(): Promise<File>;
    }

}


// https://github.com/glayzzle/doc-parser
declare module "grafine" {
    export class shard {
        constructor(db: graph, id: Number);
        isChanged(): Boolean;
        getSize(): Number;
        export(): any;
        import(data: any): index;
        get(uuid: Number): point;
        attach(point: point): shard;
        remove(point: point): shard;
        factory(uuid: Number): point;
        factory(uuid: Number, data: any): point;
    }
    export class index {
        constructor(db: graph, id: Number);
        isChanged(): Boolean;
        getSize(): Number;
        export(): any;
        import(data: any): index;
        add(key: String, value: String, point: point): index;
        add(key: String, value: String, uuid: Number): index;
        remove(key: String, value: String, point: point): index;
        remove(key: String, value: String, uuid: Number): index;
        search(key: String, value: String): Number[];
        each(key: String, cb: (value: String, uuid: Number) => void): index;
    }
    export class point {
        uuid: Number;
        constructor(db: graph);
        export(): any;
        import(data: any): point;
        delete(): point;
        removeAttribute(name: String): point;
        removeIndex(name: String): point;
        getIndex(name: String): String;
        index(name: String, value: String): point;
        set(property: String, object: point): point;
        add(property: String, object: point): point;
        get(property: String): Number[];
        first(property: String): Number;
    }
    class ExportStructure {
        hash: Number;
        capacity: Number;
        uuid: Number;
        shards: any[];
        indexes: any[];
    }
    export class graph {
        constructor();
        constructor(shards: Number);
        constructor(shards: Number, capacity: Number);
        size(): Number;
        uuid(): Number;
        shard(uuid: Number): shard;
        createShard(id: Number): shard;
        getIndex(key:String): index;
        readIndex(key: String, cb: (value: String, uuid: Number) => void): graph;
        get(uuid: Number): point;
        resolve(data: Number): point;
        resolve(data: Number[]): point[];
        removeIndex(key: String, value: String, point: point): graph;
        removeIndex(key: String, value: String, uuid: Number): graph;
        createIndex(id: Number): index;
        export(): ExportStructure;
        import(data: ExportStructure): graph;
        create(): point;
        create(point: point): point;
        search(criteria: any): Number[];
    }
}


// https://github.com/glayzzle/doc-parser
declare module "doc-parser" {

}
