"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oyunum = void 0;
var gl_matrix_1 = require("gl-matrix");
var MotorNesnesi_1 = require("../motor/MotorNesnesi");
var BasitCizer_1 = require("../motor/BasitCizer");
var Cizilebilir_1 = require("../motor/Cizilebilir");
var Kamera_1 = require("../motor/Kamera");
var OyunArayuzu_1 = require("../motor/OyunArayuzu");
var Oyunum = (function (_super) {
    __extends(Oyunum, _super);
    function Oyunum(kanvasId) {
        var _this = _super.call(this) || this;
        _this._cizer = null;
        _this._beyazKare = null;
        _this._kirmiziKare = null;
        _this._kamera = null;
        if (MotorNesnesi_1.gMotor.AnaMotor === null || MotorNesnesi_1.gMotor.AnaMotor === undefined) {
            throw new Error("ana motor null oyunum da");
        }
        MotorNesnesi_1.gMotor.AnaMotor.anaUnsurlariBaslat(kanvasId);
        _this.oyunuBaslat();
        return _this;
    }
    Object.defineProperty(Oyunum.prototype, "cizer", {
        get: function () {
            if (this._cizer === null) {
                throw new Error("Cizer null degerinde");
            }
            return this._cizer;
        },
        set: function (c) { this._cizer = c; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Oyunum.prototype, "kamera", {
        get: function () {
            if (this._kamera === null) {
                throw new Error("kamera null");
            }
            return this._kamera;
        },
        set: function (k) { this._kamera = k; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Oyunum.prototype, "kirmiziKare", {
        get: function () {
            if (this._kirmiziKare === null) {
                throw new Error("kirmizi kare null");
            }
            return this._kirmiziKare;
        },
        set: function (k) { this._kirmiziKare = k; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Oyunum.prototype, "beyazKare", {
        get: function () {
            if (this._beyazKare === null) {
                throw new Error("beyaz kare null");
            }
            return this._beyazKare;
        },
        set: function (k) { this._beyazKare = k; },
        enumerable: false,
        configurable: true
    });
    Oyunum.prototype.oyunuBaslat = function () {
        var merkez = [20, 60, 0];
        var pg = 20;
        var gliste = gl_matrix_1.vec4.fromValues(20, 40, 600, 300);
        this.kamera = new Kamera_1.Kamera(merkez, pg, gliste);
        this.kamera.arkaPlanRengi = [0.8, 0.8, 0.8, 1.0];
        this.cizer = new BasitCizer_1.BasitCizer("./srcts/glsl/basitvs.vert", "./srcts/glsl/degisikrenk.frag");
        this.kirmiziKare = new Cizilebilir_1.Cizilebilir(this.cizer);
        this.kirmiziKare.renkKoy([0.8, 0.1, 0.1, 1.0]);
        this.beyazKare = new Cizilebilir_1.Cizilebilir(this.cizer);
        this.beyazKare.renkKoy([0.8, 0.8, 0.7, 1.0]);
        this.beyazKare.donustur.konumKoy(20, 60);
        this.beyazKare.donustur.radyanKoy(0.2);
        this.beyazKare.donustur.boyutKoy(5, 5);
        this.kirmiziKare.donustur.konumKoy(20, 60);
        this.kirmiziKare.donustur.radyanKoy(-0.2);
        this.kirmiziKare.donustur.boyutKoy(2, 2);
        if (MotorNesnesi_1.gMotor.OyunDongusu === null || MotorNesnesi_1.gMotor.OyunDongusu === undefined) {
            throw new Error("OyunDongusu null oyunum da");
        }
        MotorNesnesi_1.gMotor.OyunDongusu.baslat(this);
    };
    Oyunum.prototype.guncelle = function () {
        var beyazDonustur = this.beyazKare.donustur;
        var deltaX = 0.05;
        var sagTiklandiMi = MotorNesnesi_1.gMotor.Girdi.tusTiklandiMi(MotorNesnesi_1.gMotor.Girdi.tuslar.Sag);
        console.log("sag tiklandi mi", sagTiklandiMi);
        if (sagTiklandiMi) {
            if (beyazDonustur.konumXAl() > 30) {
                beyazDonustur.konumKoy(10, 60);
            }
            beyazDonustur.konumXArti(deltaX);
        }
        var asagiTiklandiMi = MotorNesnesi_1.gMotor.Girdi.tusTiklandiMi(MotorNesnesi_1.gMotor.Girdi.tuslar.Asagi);
        console.log("asagi tiklandi mi", asagiTiklandiMi);
        if (asagiTiklandiMi) {
            beyazDonustur.dereceArti(1);
        }
        var kirmiziDonustur = this.kirmiziKare.donustur;
        if (MotorNesnesi_1.gMotor.Girdi.tusTiklandiMi(MotorNesnesi_1.gMotor.Girdi.tuslar.Yukari)) {
            if (kirmiziDonustur.boyutXAl() > 5) {
                kirmiziDonustur.boyutKoy(2, 2);
            }
            kirmiziDonustur.boyutArti(deltaX);
        }
    };
    Oyunum.prototype.ciz = function () {
        if (MotorNesnesi_1.gMotor.AnaMotor === null || MotorNesnesi_1.gMotor.AnaMotor === undefined) {
            throw new Error("AnaMotor null oyunum da");
        }
        MotorNesnesi_1.gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1.0]);
        this.kamera.bakmaProjMatKur();
        this.kirmiziKare.ciz(this.kamera.bakmaProjMat);
        this.beyazKare.ciz(this.kamera.bakmaProjMat);
    };
    return Oyunum;
}(OyunArayuzu_1.OyunArayuzu));
exports.Oyunum = Oyunum;
//# sourceMappingURL=Oyunum.js.map