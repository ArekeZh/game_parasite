tweet = message => {
    open(
        nomangle('//twitter.com/intent/tweet?') +
        nomangle('url=') + location +
        nomangle('&text=') + encodeURIComponent(message)
    );
};
