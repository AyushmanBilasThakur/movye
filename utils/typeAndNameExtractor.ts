const typeAnnNameExtractor = (args: string[]) => {
    let type = args[0];
    let name = args.filter((val, index) => index != 0).join(" ");

    return {type, name};
}

export default typeAnnNameExtractor;