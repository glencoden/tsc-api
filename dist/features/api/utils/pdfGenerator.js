"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PDFDocument = require('pdfkit');
const PDFDocumentWithTable = require('pdfkit-table');
const format = require('date-fns/format');
const de = require('date-fns/locale/de');
const { numToFixed } = require('../helpers/numToFixed');
const isObject_1 = require("../helpers/isObject");
var FontSizes;
(function (FontSizes) {
    FontSizes[FontSizes["XS"] = 10] = "XS";
    FontSizes[FontSizes["S"] = 15] = "S";
    FontSizes[FontSizes["M"] = 22] = "M";
    FontSizes[FontSizes["L"] = 36] = "L";
    FontSizes[FontSizes["XL"] = 40] = "XL";
})(FontSizes || (FontSizes = {}));
const fallbackString = '-';
function createCertificates(res, competitors) {
    if (!Array.isArray(competitors) || !competitors.every(isObject_1.isObject)) {
        console.warn('something wrong with competitors:', competitors);
        res.end();
        return;
    }
    const doc = new PDFDocument({ autoFirstPage: false });
    doc.pipe(res);
    function addPage() {
        doc.addPage({
            margins: {
                top: 250,
                bottom: 0,
                left: 0,
                right: 0
            }
        });
    }
    let index = 0;
    doc.on('pageAdded', () => {
        const competitor = competitors[index];
        try {
            doc.fontSize(FontSizes.XL);
            doc.text(competitor.name || fallbackString, { align: 'center' });
            doc.fontSize(FontSizes.M);
            doc.moveDown();
            doc.fillColor('grey').text(`${competitor.club || fallbackString}`, { align: 'center' });
            doc.fontSize(FontSizes.XS);
            doc.moveDown();
            doc.fontSize(FontSizes.M);
            doc.fillColor('black').text(`${competitor.eventName || fallbackString} - ${competitor.ageGroupAtEvent || fallbackString}`, { align: 'center' });
            doc.fontSize(FontSizes.XL);
            doc.moveDown();
            const emptyFirst = competitor.resultsForEvent.reduce((r) => (`${r} \n`), '');
            const disciplines = competitor.resultsForEvent.reduce((r, e) => (`${r}${e.discipline}\n`), '');
            const results = competitor.resultsForEvent.reduce((r, e) => (`${r}${e.result}\n`), '');
            const points = competitor.resultsForEvent.reduce((r, e) => (`${r}${e.points}\n`), '');
            doc.fontSize(FontSizes.S);
            doc.text(`${emptyFirst}${disciplines}${results}${points}`, {
                columns: 4,
                columnGap: 30,
                height: competitor.resultsForEvent.length * (FontSizes.S + 11),
                width: 510,
                lineGap: 7,
                align: 'justify'
            });
            doc.fontSize(FontSizes.XL);
            doc.moveDown();
            doc.fontSize(FontSizes.L);
            doc.text(`Platz ${competitor.rank || fallbackString}`, { align: 'center' });
            doc.fontSize(FontSizes.S);
            doc.moveDown();
            doc.fontSize(FontSizes.M);
            doc.text(`Mit ${competitor.points || fallbackString} Punkten`, { align: 'center' });
            doc.moveDown();
            const eventDate = format(new Date(competitor.eventDate), 'do MMMM yyyy', { locale: de });
            doc.fontSize(FontSizes.S);
            doc.fillColor('grey').text(eventDate, { align: 'center' });
        }
        catch (err) {
            console.log('error filling pdf page: ', err);
        }
        if (index < competitors.length - 1) {
            index++;
            addPage();
        }
        else {
            doc.end();
        }
    });
    addPage();
}
function createProtocol(res, competitors) {
    if (!Array.isArray(competitors) || !competitors.every(isObject_1.isObject)) {
        console.warn('something wrong with competitors:', competitors);
        res.end();
        return;
    }
    const doc = new PDFDocumentWithTable({
        layout: 'landscape',
        margin: 30
    });
    doc.pipe(res);
    const eventName = competitors[0].eventName;
    const eventDate = new Date(competitors[0].eventDate);
    const title = `${eventName}, ${numToFixed(eventDate.getDate(), 2)}.${numToFixed(eventDate.getMonth() + 1, 2)}.${eventDate.getFullYear()}`;
    let competitorWithAllResults = null;
    competitors.forEach((competitor) => {
        const numDisciplines = competitor.resultsForEvent.length;
        if (competitorWithAllResults !== null && numDisciplines <= competitorWithAllResults.resultsForEvent.length) {
            return;
        }
        competitorWithAllResults = competitor;
    });
    const disciplines = competitorWithAllResults !== null ? competitorWithAllResults.resultsForEvent.map((result) => result.discipline) : [];
    let firstResultColumnIndex = -1;
    function resultRenderer(_1, columnIndex, _2, row) {
        const value = row.resultsForEvent;
        if (firstResultColumnIndex === -1) {
            firstResultColumnIndex = columnIndex;
        }
        const currentIndex = columnIndex - firstResultColumnIndex;
        const currentDiscipline = disciplines[currentIndex];
        const currentResult = value.find((e) => e.discipline === currentDiscipline);
        if (!currentResult) {
            return '-';
        }
        return `${currentResult.result} | ${currentResult.points}`
            .replace('Übungen', 'Übg.')
            .replace('Punkte', 'P');
    }
    const resultColumns = disciplines.map((discipline, index) => ({
        label: discipline,
        property: '',
        width: index === disciplines.length - 1 ? 90 : 70,
        renderer: resultRenderer
    }));
    const columns = [
        { label: 'Jg.', property: 'year', width: 25 },
        { label: 'AK', property: 'ageGroupAtEvent', width: 30 },
        { label: '', property: 'gender', width: 25 },
        { label: 'Name', property: 'name', width: 90 },
        { label: 'Verein', property: 'club', width: 90 },
        { label: 'Kgew.', property: 'weightAtEvent', width: 40 },
        ...resultColumns,
        { label: 'Ges. Pkt.', property: 'points', width: 40 },
        { label: 'Platz', property: 'rank', width: 25 },
    ];
    doc.table({
        title,
        subtitle: 'Protokoll',
        headers: columns,
        datas: competitors
    });
    doc.end();
}
function createFallback(res) {
    const doc = new PDFDocument;
    doc.pipe(res);
    doc.fontSize(32);
    doc.text('Nichts zu drucken', { align: 'center' });
    doc.end();
}
exports.default = {
    createCertificates,
    createProtocol,
    createFallback
};
//# sourceMappingURL=pdfGenerator.js.map