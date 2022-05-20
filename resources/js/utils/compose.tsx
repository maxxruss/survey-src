type FunctionF = (wrapped: any) => {};
type FuncsTypes = any;
type ComponentType = any;

const compose =
    (...funcs: FuncsTypes) =>
    (comp: ComponentType) => {
        return funcs.reduceRight(
            (wrapped: any, f: FunctionF) => f(wrapped),
            comp
        );
    };

export default compose;
