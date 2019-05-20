/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const applns = [
            {
                motherName: 'xxxx',
                fatherName: 'yyyy',
                hospitalName: 'hosp1',
                dob: '2019-05-10',
            },
            {
                motherName: 'xxxx1',
                fatherName: 'yyyy1',
                hospitalName: 'hosp2',
                dob: '2019-05-11',
            },

        ];

        for (let i = 0; i < applns.length; i++) {
            applns[i].docType = 'certificate';
            await ctx.stub.putState('Reg' + i, Buffer.from(JSON.stringify(applns[i])));
            console.info('Added <--> ', applns[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }


    async birthRegistration(ctx, regNo, motherName, fatherName, hospitalName, dob) {
        console.info('============= START : Birth Certificate Registration ===========');
        // const v1options = {
        //     node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
        //     clockseq: new Date().getDate(),
        //     msecs: new Date().getTime(),
        //     nsecs: new Date().getSeconds()
        // };
        // const Id = 'Doc'+uuidv1(v1options);

        //let application = JSON.parse(appln);

        // const certificateInfo = {
        //     DOC_TYPE: 'certificate',
        //     CIRCLE_NO: application.CIRCLE_NO,
        //     WARD_NO: application.WARD_NO,
        //     TYPE_OF_HOSPITAL: application.TYPE_OF_HOSPITAL,
        //     HOSPITAL_NAME: application.HOSPITAL_NAME,
        //     HOSPITAL_ADDRESS: application.HOSPITAL_ADDRESS,
        //     ATTENTION_TYPE: application.ATTENTION_TYPE,
        //     INFORMANT_NAME: application.INFORMANT_NAME,
        //     DATE_OF_BIRTH: application.DATE_OF_BIRTH,
        //     CHILD_FIRST_NAME: application.CHILD_FIRST_NAME,
        //     GENDER: application.GENDER,
        //     BABY_WEIGHT: application.BABY_WEIGHT,
        //     BIRTH_ORDER: application.BIRTH_ORDER,
        //     NO_OF_BABIES: application.NO_OF_BABIES,
        //     BIRTH_TYPE: application.BIRTH_TYPE,
        //     STILL_DEATH_CAUSE: application.STILL_DEATH_CAUSE,
        //     STILL_DEATH_CAUSE_DETAILS: application.STILL_DEATH_CAUSE_DETAILS,
        //     MOTHER_FIRST_NAME: application.MOTHER_FIRST_NAME,
        //     MOTHER_LITERACY: application.MOTHER_LITERACY,
        //     MOTHER_OCCUPATION: application.MOTHER_OCCUPATION,
        //     MOTHER_RELIGION: application.MOTHER_RELIGION,
        //     MOTHER_NATIONALITY: application.MOTHER_NATIONALITY,
        //     MOTHER_AGE_AT_MARRIAGE: application.MOTHER_AGE_AT_MARRIAGE,
        //     MOTHER_AGE_AT_DELIVERY: application.MOTHER_AGE_AT_DELIVERY,
        //     PREGNANT_DURATION: application.PREGNANT_DURATION,
        //     DELIVERY_METHOD: application.DELIVERY_METHOD,
        //     MOTHER_MOBILE: application.MOTHER_MOBILE,
        //     FATHER_NAME: application.FATHER_NAME,
        //     FATHER_LITERACY: application.FATHER_LITERACY,
        //     FATHER_OCCUPATION: application.FATHER_OCCUPATION,
        //     FATHER_RELIGION: application.FATHER_RELIGION,
        //     FATHER_NATIONALITY: application.FATHER_NATIONALITY,
        //     FATHER_MOBILE: application.FATHER_MOBILE,
        //     RESIDENCE_ADDRESS: application.RESIDENCE_ADDRESS,
        //     REG_NO: application.REG_NO,
        //     REG_DATE: application.REG_DATE,
        //     ACK_NO: application.ACK_NO,
        //     ACK_DATE: application.ACK_DATE,
        //     REMARKS: application.REMARKS,
        //     PRINT_STATUS: application.PRINT_STATUS,
        //     FIRST_SIGNED_BY: application.FIRST_SIGNED_BY,
        //     FIRST_SIGNED_DATE: application.FIRST_SIGNED_DATE,
        //     APPROVAL_STATUS: application.APPROVAL_STATUS,
        //     REF_DATE: application.REF_DATE,
        //     CERT_PRINT: application.CERT_PRINT,
        //     CERT_PRINT_DATE: application.CERT_PRINT_DATE,
        //     EIDNUMBER: application.EIDNUMBER,
        //     ANYDEFECT: application.ANYDEFECT,
        //     DEFECTDESC: application.DEFECTDESC,
        //     REGISTRATION_NUMBER: application.REGISTRATION_NUMBER,
        //     MOTHER_UID_NUMBER: application.MOTHER_UID_NUMBER,
        //     FATHER_UID_NUMBER: application.FATHER_UID_NUMBER,
        //     MOTHER_KCR_KITNO: application.MOTHER_KCR_KITNO,
        //     ZERO_DOSE_IMMNZN: application.ZERO_DOSE_IMMNZN,
        //     CERTIFICATE_NUMBER: '',
        //     NO_OF_COPIES: 0,
        //     FEE_COLLECTED: 0,
        //     RES_DISTRICT: '',
        //     RES_PINCODE: '',
        //     MOBILE_NO: 0,
        //     PHONE_NO: 0,
        //     EMAIL_ID: '',
        //     CHILD_NAME_CORR: '',
        //     FATHER_NAME_CORR: '',
        //     MOTHER_NAME_CORR: '',
        //     APPLIED_BY: '',
        //     RELATION: '',
        //     DOB_CORR: '',
        //     SEX_CORR: '',
        //     BIRTH_PLACE_CORR: '',
        //     PERM_ADDRESS: '',
        //     C_NAME_CORRECTED_YES_NO: false,
        //     F_NAME_CORRECTED_YES_NO: false,
        //     M_NAME_CORRECTED_YES_NO: false,
        //     DOB_CORRECTED_YES_NO: false,
        //     SEX_CORRECTED_YES_NO: false,
        //     B_PLACE_CORRECTED_YES_NO: false,
        //     DIGITALLY_SIGNED: false,
        //     CSC_USERID: '',
        //     CIRCLE_ACCEPTED: false,
        //     CIRCLE_ACCEPTED_DATE: ''
        // };
        let certificateInfo = {
            docType: 'certificate',
            motherName,
            fatherName,
            hospitalName,
            dob
        }

        await ctx.stub.putState(regNo, Buffer.from(JSON.stringify(certificateInfo)));
        console.info('============= END : Birth Certificate Registration ===========');
    }

    async queryAllApplns(ctx) {
        const startKey = 'Reg1';
        const endKey = 'Reg999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = FabCar;
