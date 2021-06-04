package gov.ny.its.hs.maslow.shared.model;

import java.util.*;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import javax.validation.constraints.*;

/** Defines the resource bundle for text that needs to be translated for a question. */
@JsonInclude(Include.NON_NULL) // Ensures only non-null fields are serialized to JSON.
public class QuestionResources {
  @NotBlank
  private String text;

  private String hint;

  private List<String> options;

  /**
   * Gets the display text of the question.
   */
  public String getText() {
    return text;
  }

  /** Sets the value of {@link #getText()} */
  public void setText(String text) {
    this.text = text;
  }

  /** Gets the hint text of the question. */
  public String getHint() {
    return hint;
  }

  /** Sets the value of {@link #getHint()} */
  public void setHint(String hint) {
    this.hint = hint;
  }

  /**
   * Gets the display option
   */
  public List<String> getOptions() {
    return options;
  }

  /** Sets the value of {@link #getOptions()} */
  public void setOptions(List<String> options) {
    this.options = options;
  }

}
