using Microsoft.EntityFrameworkCore.Migrations;

namespace Entities.Migrations
{
    public partial class ForeignKeyUserMedicalAppointment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "MedicalAppointment",
                maxLength: 450,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 450);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalAppointment_UserId",
                table: "MedicalAppointment",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalAppointment_Users_UserId",
                table: "MedicalAppointment",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalAppointment_Users_UserId",
                table: "MedicalAppointment");

            migrationBuilder.DropIndex(
                name: "IX_MedicalAppointment_UserId",
                table: "MedicalAppointment");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "MedicalAppointment",
                maxLength: 450,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 450,
                oldNullable: true);
        }
    }
}
