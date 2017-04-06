export interface ILocalizableOwner {
    locale: string;
}

export class LocalizableString {
    public static  defaultLocale: string = "default";
    private values = {};
    constructor (public owner: ILocalizableOwner) {
    }
    public get locale() {return this.owner ? this.owner.locale : ""; }
    public get text() : string { 
        var keys = Object.keys(this.values);
        if(keys.length == 0) return "";
        var loc = this.locale;
        if(!loc) loc = LocalizableString.defaultLocale;
        var res = this.values[loc];
        if(!res && loc !== LocalizableString.defaultLocale) {
            res = this.values[LocalizableString.defaultLocale];
        }
        return res ? res : this.values[keys[0]];
    }
    public set text(value: string) {
        this.setLocaleText(this.locale, value);
    }
    public getLocaleText(loc: string): string {
        if(!loc) loc = LocalizableString.defaultLocale;
        var res = this.values[loc];
        return res ? res : "";
    }
    public setLocaleText(loc: string, value: string) {
        if(!loc) loc = LocalizableString.defaultLocale;
        this.values[loc] = value;
    }
    public getJson(): any {
        var keys = Object.keys(this.values);
        if(keys.length == 0) return null;
        if(keys.length == 1) return this.values[keys[0]];
        return this.values;
    }
    public setJson(value: any) {
        this.values = {};
        if(!value) return;
        if (typeof value === 'string') {
            this.setLocaleText(null, value);
        } else {
            for(var key in value) {
                this.setLocaleText(key, value[key]);
            }
        }
    }
}